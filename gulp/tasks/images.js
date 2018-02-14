var gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
	image = require('gulp-image'),
    config = require('../config');

gulp.task('images', function () {
    return gulp
        .src(config.src.img + '/**')
		.pipe(image({
			pngquant: true,
			optipng: false,
			zopflipng: true,
			jpegRecompress: true,
			mozjpeg: true,
			guetzli: false,
			gifsicle: true,
			svgo: true,
			concurrent: 10,
			options: {
				optipng: ['-i 1', '-strip all', '-fix', '-o7', '-force'],
				pngquant: ['--speed=1', '--force', 256],
				zopflipng: ['-y', '--lossy_8bit', '--lossy_transparent'],
				jpegRecompress: ['--strip-all', '--quality', 'medium', '--min', 40, '--max', 60],
				mozjpeg: ['-optimize', '-progressive'],
				guetzli: ['--quality', 85],
				gifsicle: ['--optimize'],
				svgo: ['--enable', 'cleanupIDs', '--disable', 'convertColors']
			}
	    }))
        .pipe(gulp.dest(config.dest.img));
});

gulp.task('images:watch', function() {
    gulp.watch(config.src.img + '/**', ['images']);
});
