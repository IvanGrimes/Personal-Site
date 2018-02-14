var gulp   = require('gulp');
var config = require('../config');

gulp.task('watch',
    [
    'sass:watch',
    'pug:watch',
    'webpack:watch',
    'fonts:watch',
    'images:watch',
    ]
);
