var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    postcss = require('gulp-postcss'),
    uncomment = require('postcss-discard-comments'),
    focus = require('postcss-focus'),
    autoprefixer = require('autoprefixer'),
    mqpacker = require('css-mqpacker'),
    nano = require('cssnano'),
    config = require('../config');
//мб добавить style-lint и style-lint-selector-bem-pattern
var processors = [
    uncomment,
    focus,
    autoprefixer
    ({
      browsers: ['last 4 version'],
      cascade: false
    }),
    mqpacker
    ({
      sort: sortMediaQueries
    }),
    nano
    ({
      preset: 'default'
    })
];


gulp.task('sass', function () {
  return gulp.src(config.src.sass + '/*.{sass,scss}')
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: ['bower_components/susy/sass'],
      outputStyle: 'compact', // nested, expanded, compact, compressed
      precision: 5
    })).on('error', config.errorHandler)
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.dest.css));
});

gulp.task('sass:watch', function() {
    gulp.watch(config.src.sass + '/**/**', ['sass']);
});



function isMax(mq) {
    return /max-width/.test(mq);
}

function isMin(mq) {
    return /min-width/.test(mq);
}

function sortMediaQueries(a, b) {
    A = a.replace(/\D/g, '');
    B = b.replace(/\D/g, '');

    if (isMax(a) && isMax(b)) {
        return B - A;
    } else if (isMin(a) && isMin(b)) {
        return A - B;
    } else if (isMax(a) && isMin(b)) {
        return 1;
    } else if (isMin(a) && isMax(b)) {
        return -1;
    }

    return 1;
}
