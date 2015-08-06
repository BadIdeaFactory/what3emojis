'use strict'

var gulp = require('gulp')
var gutil = require('gulp-util')
var livereload = require('gulp-livereload')
var sourcemaps = require('gulp-sourcemaps')

var paths = {
  styles: 'src/css/**/*.scss',
  scripts: 'src/js/**/*.js'
}

gulp.task('default', ['css', 'js', 'watch'])

gulp.task('css', function () {
  var sass = require('gulp-sass')
  var autoprefix = require('gulp-autoprefixer')
  var cssimport = require('gulp-cssimport')
  var minifyCSS = require('gulp-minify-css')

  gulp.src('src/css/styles.scss')
    .pipe(sass())
    .pipe(autoprefix('last 2 versions'))
    .pipe(cssimport())
    .pipe(minifyCSS({ keepSpecialComments: 0 }))
    .pipe(gulp.dest('css/'))
    .pipe(livereload())
})

gulp.task('js', function () {
  var browserify = require('browserify')
  var source = require('vinyl-source-stream')
  var buffer = require('vinyl-buffer')
  var uglify = require('gulp-uglify')

  var bundle = browserify({
    entries: 'src/js/index.js'
  })

  return bundle.bundle()
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
      // Add transformation tasks to the pipeline here.
      .pipe(uglify())
      .on('error', gutil.log)
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./js'))
})

gulp.task('watch', function () {
  livereload.listen()
  gulp.watch(paths.styles, ['css'])
  gulp.watch(paths.scripts, ['js'])
})
