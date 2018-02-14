var gulp = require('gulp');

gulp.task('fonts', function() {
    return gulp
        .src(config.src.fonts + '/**')
        .pipe(gulp.dest(config.dest.fonts));
});

gulp.task('fonts:watch', function() {
    gulp.watch(config.src.fonts + '/**', ['fonts']);
});
