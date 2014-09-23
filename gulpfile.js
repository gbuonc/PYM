'use strict';
var gulp = require('gulp');
var rubySass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var fileinclude = require('gulp-file-include');
var runSequence = require('run-sequence');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var minifyCSS = require('gulp-minify-css');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

// HTML ---------------------------------------------------------------------
gulp.task('fileinclude', function() {
  gulp.src(['dev/*.html'])
    .pipe(fileinclude({
      prefix: '__',
      basepath: '@file'
    }))
    .pipe(gulp.dest('dist'))
	 .pipe(reload({stream: true}));
});
gulp.task('temp', function() {
  gulp.src(['dev/temp/*.html'])
    .pipe(gulp.dest('dist/temp/'))
	 .pipe(reload({stream: true}));
});

// CSS ---------------------------------------------------------------------
gulp.task('scss', function () {
  	return gulp.src(['dev/assets/css/*.scss'])
    .pipe(rubySass({
      style: 'expanded',
      precision: 10,
      loadPath: ['dist/assets/css']
    }))
    .pipe(autoprefixer('last 3 versions'))
	 //.pipe(sourcemaps.init())
	 .pipe(minifyCSS({compatibility:'ie8'}))
	 //.pipe(sourcemaps.write())
	 .pipe(gulp.dest('dist/assets/css'))
	 .pipe(reload({stream: true}))
});

// FONTS --------------------------------------------------------------------
gulp.task('fonts', function () {
   gulp.src(['dev/assets/icon-fonts{,/**}', 'dev/assets/webfonts{,/**}'])
     .pipe(gulp.dest('dist/assets'))
     .pipe(reload({stream: true}))
});

// JS ---------------------------------------------------------------------
gulp.task('scripts-libs', function() {
  return gulp.src(['./dev/assets/js/vendor/common/*.js'])
  	 //.pipe(sourcemaps.init())
    .pipe(concat('_libs.js'))
	 //.pipe(sourcemaps.write())
	 .pipe(gulp.dest('./dist/assets/js'))
	 .pipe(reload({stream: true}))
});
gulp.task('scripts-mobile', function() {
  return gulp.src(['./dist/assets/js/_libs.js', './dev/assets/js/vendor/touch/*.js', './dev/assets/js/vendor/mobile/**/*.js', './dev/assets/js/common.js', './dev/assets/js/touch.js', './dev/assets/js/mobile.js'])
  	 //.pipe(sourcemaps.init())
	 .pipe(concat('pym-mobile.js'))
	 //.pipe(uglify())
	 //.pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/assets/js'))
	 .pipe(reload({stream: true}))
});
gulp.task('scripts-tablet', function() {
  return gulp.src(['./dist/assets/js/_libs.js', './dev/assets/js/vendor/touch/*.js', './dev/assets/js/vendor/tablet/**/*.js', './dev/assets/js/common.js', './dev/assets/js/touch.js', './dev/assets/js/tablet.js'])
  	 //.pipe(sourcemaps.init())
	 .pipe(concat('pym-tablet.js'))
	 //.pipe(uglify())
	 //.pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/assets/js'))
	 .pipe(reload({stream: true}))
});
gulp.task('scripts-desktop', function() {
  return gulp.src(['./dist/assets/js/_libs.js', './dev/assets/js/vendor/desktop/**/*.js', './dev/assets/js/common.js', './dev/assets/js/desktop.js'])
  	 //.pipe(sourcemaps.init())
    .pipe(concat('pym-desktop.js'))
	 //.pipe(uglify())
	 //.pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/assets/js'))
	 .pipe(reload({stream: true}))
});
gulp.task('head', function() {
	  gulp.src(['./dev/assets/js/vendor/head.js'])
	  //.pipe(sourcemaps.init())
 	  //.pipe(uglify())
	  //.pipe(sourcemaps.write())
	  .pipe(gulp.dest('./dist/assets/js/vendor'))
});
gulp.task('scripts', function(callback) {
	runSequence('scripts-libs', 'scripts-mobile', 'scripts-tablet', 'scripts-desktop', 'head');
});
// IMG ---------------------------------------------------------------------
gulp.task('img', function () {
  gulp.src(['./dev/assets/img{,/**}'])
  .pipe(imagemin({use: [pngquant()]}))
  .pipe(gulp.dest('./dist/assets'))
});

// BUILD ---------------------------------------------------------------------
gulp.task('build', function(callback) {
	runSequence('clean',['fileinclude', 'temp', 'scss', 'img', 'scripts', 'fonts']);
});

// SERVE ---------------------------------------------------------------------
gulp.task('serve', function () {
	gulp.task('build');
  browserSync.init({
    server: {
      baseDir: ['dist'] //, 'dev', '.tmp']
    },
	 tunnel: 'spym'
    //notify: true
  });
  gulp.watch(['dev/**/*.html'], ['fileinclude', 'temp'],reload);
  gulp.watch(['dev/assets/css/**/*.{css,scss}'], ['scss'], reload);
  gulp.watch(['dev/assets/img{,/**}'], ['img'], reload);
  gulp.watch(['dev/assets/js/**/*.js'], ['scripts-libs', 'scripts-mobile', 'scripts-desktop', 'head'], reload);
  gulp.watch(['dev/assets/icon-fonts{,/**}'], ['fonts'], reload);
});
gulp.task('clean', function () {
    return gulp.src(['.tmp', 'dist'], { read: false }).pipe(clean());
});

// DEFAULT -------------------------------------------------------------------
gulp.task('default', ['serve', 'build']);
