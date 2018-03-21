const src = __dirname + "/../src/styles";
const fs = require("fs");
const glob = require("glob");
const WebfontsGenerator = require("webfonts-generator");
const SpriteGenerator = require("svg-sprite-generator");

const ignoreFolder = /(canton|category|fonts)\//;
const spriteFolder = /canton|category|social_media/;

// Normalize svg files - they might be broken as svg editors
// tend to insert their own attributes, which might break the files.
glob(src + "/**/*.svg", (err, files) => {
  files = files.filter(f => !f.match(ignoreFolder));

  WebfontsGenerator(
    {
      files,
      fontName: "TuttiFont",
      css: true,
      cddDest: src + "/styles/Typography/fonts",
      dest: src + "/Typography/fonts",
      templateOptions: {
        classPrefix: "ico-",
        baseSelector: ".ico"
      }
    },
    (error, result) => {
      if (error) {
        console.log("Failed while generating icons!", error);
      } else {
        console.log("Generated fonts!");
      }
    }
  );
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

// Remove previous sprites.
const spriteFolders = [
  src + "/Icons/assets/canton",
  src + "/Icons/assets/category",
  src + "/Icons/assets/social_media",
]

spriteFolders.forEach(folder => {
  const sprite = folder + "/_sprite.svg";
  if (fs.existsSync(sprite)) {
    fs.unlinkSync(sprite);
  }
});

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
      const viewbox = content.match(/viewBox=['"][\s\d]+['"]/);
      return viewbox ? viewbox[0] : "";
    }

    return `viewBox="0 0 ${width[1]} ${height[1]}"`;
  };

  results.sort().forEach(file => {
    if (spriteFolder.test(file)) {
      const { fname, path } = fileInfo(file);

      folders[path] = folders[path] || [
        `import React from "react";`,
        `import SVG from "./_sprite.svg"`
      ];

      const viewbox = getViewBox(file);

      folders[path].push(
        `export const ${toCamelCase(fname)} = <svg role="img" ${
          viewbox
        } className="svg-sprite"><use xlinkHref={\`\${SVG}#${fname.replace(
          /\.svg$/,
          ""
        )}\`}/></svg>`
      );
      return;
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

const callback = (err, stdout, stderr) => {
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
  if (err !== null) {
    console.log(`exec error: ${err}`);
  }
}

// Finally re-add sprite.svgs
spriteFolders.forEach(folder => {
  const sprite = `${folder}/_sprite.svg`
  process.argv = [process.argv[0], "-d", folder, "-o", sprite];
  glob(folder + "/*.svg", (err, files) => {
    SpriteGenerator.spriteFromFiles(files).then(file => {
      console.log(sprite)
      fs.writeFileSync(sprite, file)
    })
  })
  // exec(`npm run svg-sprite-generate -d ${folder} -o ${sprite}`, callback);
});