const src = __dirname + "/../src/styles";
const fs = require("fs");
const path = require("path");
const glob = require("glob");
const svgo = require("svgo");
const WebfontsGenerator = require("webfonts-generator");

glob(src + "/**/*.svg", (err, files) => {
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

const toCamelCase = str => {
  return (
    str[0].toUpperCase() +
    str
      .substr(1)
      .replace(/[-_]([a-z])/g, g => g[1].toUpperCase())
      .replace(".svg", "")
  );
};

glob(src + "/**/*.svg", (err, results) => {
  let folders = {};

  results.forEach(file => {
    if (/\.svg$/.test(file)) {
      const pieces = file.split("/");
      const fname = pieces.pop();
      const path = pieces.join("/") + "/index.js";

      folders[path] = folders[path] || [];
      folders[path].push(`export ${toCamelCase(fname)} from "./${fname}"`);
    }
  });

  Object.keys(folders).forEach(file => {
    fs.writeFile(file, folders[file].sort().join("\n"), err => {
      if (err === null) {
        console.log("Created index file: " + file);
      }
    });
  });
});
