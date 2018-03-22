const src = __dirname + "/../src/styles";
const fs = require("fs");
const glob = require("glob");
const SpriteGenerator = require("svg-sprite-generator");

const ignoreFolder = /(canton|category|fonts|_sprite)\//;
const spriteFolder = /Icons\/assets/;

// Remove previous sprites.
const spriteFolders = [src + "/Icons/assets"];

spriteFolders.forEach(folder => {
  const sprite = folder + "/_sprite.svg";
  if (fs.existsSync(sprite)) {
    fs.unlinkSync(sprite);
  } else {
    console.log("Can't find sprite: " + sprite);
  }
});

// Support svg and png files.
const extRegex = /\.(svg|png|jpg)$/;

const toCamelCase = str => {
  return (
    str[0].toUpperCase() +
    str
      .substr(1)
      .replace(/[-_]([a-z0-9])/g, g => g[1].toUpperCase())
      .replace(extRegex, "")
  );
};

glob(src + "/**/*.{svg,png,jpg}", (err, results) => {
  let folders = {};

  const fileInfo = file => {
    const pieces = file.split("/");
    const fname = pieces.pop();
    const path = pieces.join("/") + "/index.js";

    return { fname, path };
  };

  const getViewBox = file => {
    const content = fs.readFileSync(file, "utf8");
    const width = content.match(/width=["'](\d+)/);
    const height = content.match(/height=["'](\d+)/);

    if (!width || !height) {
      const viewbox = content.match(/viewBox=['"]([\s\d\.]+)['"]/);
      return viewbox ? viewbox[1] : "";
    }

    return `0 0 ${width[1]} ${height[1]}`;
  };

  results.sort().forEach(file => {
    if (spriteFolder.test(file)) {
      const { fname, path } = fileInfo(file);

      folders[path] = folders[path] || [
        `import React from "react";`,
        `import Sprite from "../../_Sprite";`
      ];

      const viewbox = getViewBox(file);
      const id = fname.replace(/\.svg$/, "");
      const sprite = `<Sprite viewBox="${viewbox}" id="${id}"/>`;

      return folders[path].push(
        `export const ${toCamelCase(fname)} = ${sprite}`
      );
    }

    // Do not match cantons/categories as we generate sprites for them.
    if (extRegex.test(file)) {
      const { fname, path } = fileInfo(file);

      folders[path] = folders[path] || [];
      folders[path].push(`export ${toCamelCase(fname)} from "./${fname}"`);
    }
  });

  Object.keys(folders).forEach(file => {
    fs.writeFile(file, folders[file].join("\n"), err => {
      if (err === null) {
        console.log("Created index file: " + file);
      }
    });
  });
});

// Finally re-add sprite.svgs
spriteFolders.forEach(folder => {
  const sprite = `${folder}/_sprite.svg`;
  glob(folder + "/**/*.svg", (err, files) => {
    SpriteGenerator.spriteFromFiles(files).then(file => {
      console.log(sprite);
      fs.writeFileSync(sprite, file);
    });
  });
});
