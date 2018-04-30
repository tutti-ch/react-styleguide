const fs = require("fs");
const glob = require("glob");
const path = require("path");
const src = path.resolve(__dirname + "/../src/styles");
const SpriteGenerator = require("svg-sprite-generator");

// Support svg and png files.
const extRegex = /\.(svg|png|jpg)$/;
const spriteFolders = ["/Icons/assets"];

const helpers = (() => ({
  /**
   * - to CamelCase.
   *
   * @param str
   * @return {string}
   */
  toCamelCase: str => {
    return (
      str[0].toUpperCase() +
      str
        .substr(1)
        .replace(/[-_]([a-z0-9])/g, g => g[1].toUpperCase())
        .replace(extRegex, "")
    );
  },

  /**
   * Return the viewbox that is specified in the svg file. We need to include
   * this in our component as a prop, otherwise the width/height gets messed up.
   *
   * @param file
   * @return {string|null}
   */
  getViewBox: file => {
    const content = fs.readFileSync(file, "utf8");
    const width = content.match(/width=["'](\d+)/);
    const height = content.match(/height=["'](\d+)/);

    // Svg sprites do not support linearGradients. We need
    // to export them as images.
    if (content.match(/linearGradient/)) {
      return null;
    }

    if (!width || !height) {
      const viewbox = content.match(/viewBox=['"]([\s\d\.]+)['"]/);
      return viewbox ? viewbox[1] : "";
    }

    return `0 0 ${width[1]} ${height[1]}`;
  },

  /**
   * Return info on the given file.
   *
   * @param file
   * @return {{fname: T, path: string}}
   */
  fileInfo: file => {
    const pieces = file.split("/");
    const fname = pieces.pop();
    const path = pieces.join("/") + "/index.js";

    return { fname, path };
  },

  _dependencies: {},
  _dependencyNames: {
    Image: path.resolve(__dirname, "../src/components/Image"),
    Sprite: path.resolve(__dirname, "../src/styles/Icons/_Sprite")
  },

  addDependency: (p, arr, dep) => {
    helpers._dependencies[p] = helpers._dependencies[p] || {};

    if (helpers._dependencies[p][dep] === undefined) {
      helpers._dependencies[p][dep] = true;

      // Calculate the level of dependency till src folder.
      const relative = path.relative(path.resolve(p, ".."), helpers._dependencyNames[dep]);
      arr.splice(1, 0, `import ${dep} from "${relative}"`);
    }
  }
}))();

// Remove old _sprite files.
glob(src + "/**/_sprite.svg", (err, results) => {
  results.forEach(sprite => {
    if (fs.existsSync(sprite)) {
      fs.unlinkSync(sprite);
    } else {
      console.log("Can't find sprite: " + sprite);
    }
  });

  // Now search all assets and prepare index files
  glob(src + "/**/*.{svg,png,jpg}", (err, results) => {
    let folders = {};
    let spriteFiles = [];

    results.sort().forEach(file => {
      const { fname, path } = helpers.fileInfo(file);
      const exportConst = `export const ${helpers.toCamelCase(fname)}`;

      folders[path] = folders[path] || [`import React from "react";`];

      // Make sure that we take sprites only within allowed folders.
      const viewbox =
        spriteFolders.filter(f => path.match(f)).length &&
        helpers.getViewBox(file);
      let exported = null;

      if (viewbox) {
        // Push to sprite files
        spriteFiles.push(file);
        helpers.addDependency(path, folders[path], "Sprite");

        const id = fname.replace(/\.svg$/, "");
        const sprite = `p => <Sprite {...p} viewBox="${viewbox}" id="${id}"/>`;

        exported = `${exportConst} = ${sprite}`;
      } else {
        helpers.addDependency(path, folders[path], "Image");
        exported = `${exportConst} = p => <Image {...p} src={require("./${fname}")} />`;
      }

      folders[path].push(exported);
    });

    Object.keys(folders).forEach(file => {
      fs.writeFile(file, folders[file].join("\n"), err => {
        if (err === null) {
          console.log("Created index file: " + file);
        }
      });
    });

    // Finally re-add sprite.svgs
    const sprite = `${src}/Icons/assets/_sprite.svg`;
    SpriteGenerator.spriteFromFiles(spriteFiles).then(file => {
      fs.writeFileSync(sprite, file);
    });
  });
});
