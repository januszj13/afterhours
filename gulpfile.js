var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
 



// run tasks

gulp.task('v2', ['dev','v2-watch']);
// watch tasks

gulp.task('v2-watch', function() {
	gulp.watch('skin/frontend/default/scss/**', ['v2-sass']);
        gulp.watch('js/src/*.js', ['scripts']);
});


// JS hint task
gulp.task('scripts', function() {
  gulp.src('js/src/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(uglify())
    .pipe(gulp.dest('js'));
});

// compile SASS

gulp.task('v2-sass', function () {
	gulp.src('skin/frontend/default/scss/*.scss')
		.pipe(sass({
			errLogToConsole: true,
			outputStyle: 'expanded'
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
