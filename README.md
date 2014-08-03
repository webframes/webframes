# webframes [![NPM Version](http://badge.fury.io/js/webframes.svg)](http://badge.fury.io/js/webframes) [![Build Status](https://secure.travis-ci.org/webframes/webframes.svg)](http://travis-ci.org/webframes/webframes) [![Dependency Status](https://david-dm.org/webframes/webframes.svg)](https://david-dm.org/webframes/webframes)

> Animated images for the web.

Create full-color, SVG-based animated images for every browser.

WebFrames images:

* can contain bitmap and/or vector artwork
* can be lossy (bitmap only) or lossless
* do not have the quality limitations of GIF
* do not have the browser limitations of APNG, MNG, WebP or video
* do not require JavaScript or a plugin
* use technology already present in current web browsers

Import an image sequence in any of these formats: GIF, JPEG, PNG ... (soon SVG)

Visit the [svachon.com/webframes](http://www.svachon.com/webframes) website for more information and examples.

## Getting Started
[Node.js](http://nodejs.org/) `~0.10` and [graphicsmagick](http://graphicsmagick.org/) are required. There're two ways to use it:

### Command-Line Usage  
To install, type this at the command line:
```
npm install webframes -g
```
After that, check out `webframes -?` for available options. Typical usage might look like:
```
webframes --folder sequence/ --export sequence.svg --save sequence.wfp -csxi
```

### Programmatic API
To install, type this at the command line:
```
npm install webframes --save-dev
```
Typical usage might look like:
```js
var webframes = require("webframes");

webframes({
	contain: true,
	css: true,
	export: true,
	files: ["path/to/image1.png", "path/to/image2.png"],
	minifyExport: true,
	minifyImport: true,
	save: "sequence.wfp",
}, function(error, result) {
	if (!error) console.log(result);	//=> {export:[Buffer], save:[Buffer]}
});
```

## Roadmap
* try putting CSS at bottom to see if it prevents the need for `--contain`, which will add support for Safari
* switch from [gm](https://github.com/aheckmann/gm) to [node-imagick](https://github.com/tjfontaine/node-imagick)
* import SVG sequences
* localize stored image paths so that tests pass on travis-ci

## Release History
* 0.0.4 friendlier non-CLI option names
* 0.0.3 removed [node-imagemagick-native](https://github.com/mash/node-imagemagick-native)
* 0.0.2 avoid race conditions on import/open
* 0.0.1 initial release
