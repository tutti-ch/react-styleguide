console.log(__dirname)
const src = __dirname + "/../src/styles"
const fs = require("fs")
const path = require("path")

/**
 * Walk recursively and list all files.
 * @param dir
 * @param done
 */
const walk = (dir, done) => {
  let results = []

  fs.readdir(dir, (err, list) => {
    if (err) {
      return done(err)
    }

    let i = 0;

    (function next() {
      let file = list[i++]

      if (!file) {
        return done(null, results)
      }

      file = dir + "/" + file
      fs.stat(file, function (err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function (err, res) {
            results = results.concat(res)
            next()
          })
        } else {
          results.push(file)
          next()
        }
      })
    })()
  })
}

const toCamelCase = str => {
  return str[0].toUpperCase() + str.substr(1).replace(/[-_]([a-z])/g, g => g[1].toUpperCase()).replace('.svg', '')
}

walk(src, (err, results) => {
  let folders = {}

  results.forEach(file => {
    if (/\.svg$/.test(file)) {
      const pieces = file.split("/")
      const fname = pieces.pop()
      const path = pieces.join("/") + "/index.js"

      folders[path] = folders[path] || []
      folders[path].push(`export ${toCamelCase(fname)} from "./${fname}"`)
    }
  })

  Object.keys(folders).forEach(file => {
    fs.writeFile(file, folders[file].sort().join("\n"), err => {
      if (err === null) {
        console.log("Created index file: " + file)
      }
    })
  })
})