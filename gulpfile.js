var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

// run tasks

gulp.task('v2', ['dev','v2-watch']);
// watch tasks

gulp.task('v2-watch', function() {
	gulp.watch('skin/frontend/default/scss/**', ['v2-sass']);
});

// compile SASS

gulp.task('v2-sass', function () {
	gulp.src('skin/frontend/default/scss/*.scss')
		.pipe(sass({
			errLogToConsole: true,
			outputStyle: 'compressed'
		}))
		.pipe(gulp.dest('skin/frontend/default/css/'))
		.pipe(reload({stream: true}));
});


// browser sync

gulp.task('dev', function() {
	browserSync({
		proxy: "www.localhost.com/hussars/afterhours/"
	});
});
