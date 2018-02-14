var gulp        = require('gulp'),
    config      = require('../config'),
    htmlhint    = require('gulp-htmlhint'),
    sassLint    = require('gulp-sass-lint'),
    stylelint   = require('gulp-stylelint');

//добавить js lint

gulp.task('lint:html', function() {
  return gulp
      .src(config.dest.html + "/*.html")
      .pipe(htmlhint('.htmlhintrc'))
      .pipe(htmlhint.failReporter());
});

gulp.task('lint:sass', function() {
  return gulp
      .src('src/sass/**/*.s+(a|c)ss')
      .pipe(sassLint())
      .pipe(sassLint.format())
      .pipe(sassLint.failOnError());
});

gulp.task('lint:css', function() {
  return gulp
      .src(config.dest.css + "/*.css")
      .pipe(stylelint());
});

gulp.task('lint', [
    'lint:sass',
    'lint:css',
    'lint:html'
]);
