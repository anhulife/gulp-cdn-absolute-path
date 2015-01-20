'use strict';

var path = require('path');
var gutil = require('gulp-util');
var through = require('through2');
var url = require('url');


module.exports = function (options) {
	var contents, mainPath, reg, asset, assetAbsolute, cdn;

	cdn = options.cdn;

	if(!/\/$/.test(cdn)){
		cdn = cdn + '/';
	}

	asset = options.asset || process.cwd();

	assetAbsolute = path.resolve(asset);

	reg = new RegExp('["\'\\(]\\s*([\\w\\_\/\\.\\-]*\\.('+ (options.exts ? options.exts.join('|') : 'jpg|jpeg|png|gif|cur|js|css') +'))[^\\)"\']*\\s*[\\)"\']', 'gim');

	return through.obj(function (file, enc, callback) {
		if (file.isNull()) {
			this.push(file);
			return callback();
		}

		if (file.isStream()) {
			this.emit('error', new gutil.PluginError('gulp-cdn-absolute-path', 'Streams are not supported!'));
			return callback();
		}

		mainPath = path.dirname(file.path);

		contents = file.contents.toString().replace(reg, function(content, filePath){
			var relative;

			if(/^\.\./.test(filePath)){
				if(mainPath.indexOf(assetAbsolute) !== -1){
					relative = path.relative(asset, path.resolve(asset, mainPath, filePath));
				}
			}else if(/^\//.test(filePath)){
        relative = filePath.replace(/^\//, '');
      }else{
				relative = filePath;
			}
			return relative ? content.replace(filePath, url.resolve(cdn, relative)) : content;
		});

		file.contents = new Buffer(contents);

		this.push(file);
		return callback();
	});
};