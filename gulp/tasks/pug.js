var gulp = require('gulp');
    pug = require('gulp-pug'),
    prettify = require('gulp-prettify'),
    config = require('../config');


gulp.task('pug', function () {
  return gulp
      .src(config.src.templates + '/*.pug')
      .pipe(pug()).on('error', config.errorHandler)
      .pipe(prettify({
          indent_size: 2,
          wrap_attributes: 'auto', // 'force'
          preserve_newlines: false,
          // unformatted: [],
          end_with_newline: true
      }))
      .pipe(gulp.dest(config.dest.html));
});

gulp.task('pug:watch', function() {
    gulp.watch(config.src.templates + '/**/*.pug', ['pug']);
});
