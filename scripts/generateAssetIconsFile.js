var recursivelyListDirectory = require('recursive-readdir');
var path = require('path')
var fs = require('fs')

var REACT_STYLEGUIDE_ASSET_ICONS_DIRECTORY = 'styleguide/assets/icons/'
var REACT_STYLEGUIDE_ASSET_ICONS_COMPONENT_DIRECTORY = '../styleguide/components/AssetIcons'

function ignoreNonSVGFiles(file, stats) {
    return !stats.isDirectory() && !/\.svg$/.test(path.basename(file))
}

recursivelyListDirectory(REACT_STYLEGUIDE_ASSET_ICONS_DIRECTORY, [ignoreNonSVGFiles], function (err, files) {
    if (err) {
	return console.warn('Error listing ' + REACT_STYLEGUIDE_ASSET_ICONS_DIRECTORY + ': ',JSON.stringify(err))
    }
    var REMOVE_LEADING_PATH_REGEXP = new RegExp(REACT_STYLEGUIDE_ASSET_ICONS_DIRECTORY)
    var filenames = files.map(function (icon) { return '"' + icon.replace(REMOVE_LEADING_PATH_REGEXP, '') + '"' }).sort()
    var template = 'module.exports = [' + filenames.join(',') + '];\n\n'
    fs.writeFile(path.resolve(__dirname, REACT_STYLEGUIDE_ASSET_ICONS_COMPONENT_DIRECTORY + '/iconList.js'), template, function (err) { if(err) console.warn('Write failed: ',JSON.stringify(err)); } )
})

