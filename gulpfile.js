var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var assign = require('lodash.assign');
var concat = require('gulp-concat');
var concatCss = require('gulp-concat-css');
var browserSync = require('browser-sync');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');

var scr = [
	// './node_modules/paper/dist/paper-full.min.js',
	// './node_modules/sweetalert2/dist/sweetalert2.js'
];
var sty = [
	// './node_modules/sweetalert2/dist/sweetalert2.css'
];

var b = browserify();

gulp.task('bundle', ['css', 'js'], function () {
	browserSync.reload();
});

gulp.task('bfy', function () {
	return b.bundle()
	// log errors if they happen
		.on('error', gutil.log.bind(gutil, 'Browserify Error'))
		.pipe(source('bundle.js'))
		.pipe(buffer()) // <----- convert from streaming to buffered vinyl file object
		.pipe(uglify()) // now gulp-uglify works
		// optional, remove if you don't need to buffer file contents
		.pipe(buffer())
		// optional, remove if you dont want sourcemaps
		.pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
		// Add transformation tasks to the pipeline here.
		.pipe(sourcemaps.write('./')) // writes .map file
		.pipe(gulp.dest('app/dist/'));
});

gulp.task('js', function () {
	return gulp.src(scr)
		.pipe(concat('app.js'))
		.pipe(gulp.dest('app/dist/'));
});

gulp.task('css', ['sass'], function () {
	return gulp.src(sty)
		.pipe(concatCss("bundle.css"))
		.pipe(gulp.dest('app/dist/'));
});

gulp.task('sass', function () {
	return gulp.src('./app/sass/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./app/css'));
});

gulp.task('reload', function () {
	browserSync.reload();
});

gulp.task('reloadcss', ['css'], function () {
	browserSync.reload();
});

gulp.task('reloadjs', ['js'], function () {
	browserSync.reload();
});


gulp.task('default', ['bundle'], function () {
	// browserSync({
	// 	notify: false,
	// 	server: ['app'],
	// 	port: 3000
	// });

	gulp.watch(['app/**/*.html'], ['reload']);
	gulp.watch(['app/sass/**/*.scss'], ['reloadcss']);
	gulp.watch(['app/css/**/*.css'], ['reloadcss']);
	gulp.watch(['app/scripts/**/*.js'], ['reloadjs']);
	gulp.watch(['app/images/**/*'], ['reload']);
});
