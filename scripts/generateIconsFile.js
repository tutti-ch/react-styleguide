var path = require('path')
var glob = require('glob')
var fs = require('fs')

var REACT_MYPAGES_SOURCE_DIRECTORY = '../node_modules/react-mypages/src';
var REACT_MYPAGES_SVG_DIRECTORY = '/icons/tutti-icons/';
var REACT_MYPAGES_SVG_ICONS = REACT_MYPAGES_SVG_DIRECTORY + '*.svg';
var REACT_STYLEGUIDE_ICONSET_DIRECTORY = '../styleguide/components/Icons/iconList.js'

var options = {
  root: path.resolve(__dirname, REACT_MYPAGES_SOURCE_DIRECTORY)
}

glob(path.resolve(__dirname, REACT_MYPAGES_SVG_ICONS), options, function (err, res) {
    if (!err) {
	var filenames = res.map(function (icon) { return '"' + path.basename(icon, '.svg') + '"' })
	var template = 'module.exports = [' + filenames.join(',') + '];\n\n'
	fs.writeFile(path.resolve(__dirname, REACT_STYLEGUIDE_ICONSET_DIRECTORY), template, function (err) { if(err) console.warn('Write failed: ',JSON.stringify(err)); } )
    } else {
	console.warn('Error globbing ' + REACT_MYPAGES_SOURCE_DIRECTORY + REACT_MYPAGES_SVG_ICONS + ': ',JSON.stringify(err));
    }
})
