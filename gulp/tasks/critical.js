var gulp = require('gulp'),
	critical = require('critical').stream,
	config = require('../config');

gulp.task('critical', function () {
	return gulp.src(config.dest.root + '/index.html')
	.pipe(critical({
		base: config.dest.root,
		inline: true,
		css: [config.dest.css + '/app.css'],
	}))
	.on('error', config.errorHandler)
	.pipe(gulp.dest(config.dest.root));
});
