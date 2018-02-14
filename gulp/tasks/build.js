var gulp        = require('gulp');
var runSequence = require('run-sequence');
var config      = require('../config');

function build(cb) {
    runSequence(
        'sass',
        'webpack',
        'images',
        'fonts',
        'pug',
        cb
    );
}

gulp.task('build', function(cb) {
    build(cb);
});
