'use strict';
var assert = require('assert');
var gulp = require('gulp');
var concatStream = require('concat-stream');
var cdnAbsolutePath = require('./');

describe('fill cdn', function () {
	it('html', function (cb) {
		gulp.src(['fixture/**/*.html', 'fixture/**/*.css'])
			.pipe(cdnAbsolutePath({asset: 'fixture/static', cdn: 'http://www.a.com/b'}))
			.pipe(gulp.dest('fixture'))
			.pipe(concatStream(function(buf){
				buf.forEach(function(item){
					assert.notEqual(-1, item.contents.toString().indexOf('http://www.a.com/b'));
				});

				cb();
			}));
	});
});