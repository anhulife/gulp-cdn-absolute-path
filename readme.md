gulp-cdn-absolute-path
=============

> A gulp plugin for replacing local path with cdn absolute path

## Install

```
npm install --save-dev gulp-cdn-absolute-path
```

## Examples
```js
var gulp = require('gulp');
var cdnAbsolutePath = require('gulp-cdn-absolute-path');

gulp.task('cdn-absolute-path', function () {
	gulp.src('template/**/*.html')
		.pipe(cdnAbsolutePath({asset: 'static', cdn: 'http://www.a.com'}))
		.pipe(gulp.dest('template'));
});
```