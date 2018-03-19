const src = __dirname + "/../src/styles";
const fs = require("fs");
const glob = require("glob");
const WebfontsGenerator = require("webfonts-generator");

const ignoreFolder = /(canton|category|fonts)\//;

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
const spriteRegex = /canton|category/;

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

  results.sort().forEach(file => {
    if (spriteRegex.test(file)) {
      const { fname, path } = fileInfo(file);

      folders[path] = folders[path] || [
        `import React from "react";`,
        `import SVG from "./sprite.svg"`
      ];
      folders[path].push(
        `export const ${toCamelCase(
          fname
        )} = <svg role="img" className="icon-svg"><use xlinkHref={\`\${SVG}#${fname.replace(
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
