'use strict'

var gulp = require('gulp')
var gutil = require('gulp-util')
var livereload = require('gulp-livereload')

var paths = {
  styles: 'src/css/**/*.scss',
  scripts: 'src/js/**/*.js'
}

gulp.task('default', ['build', 'watch'])

gulp.task('build', ['css', 'js'])

gulp.task('css', function () {
  var sass = require('gulp-sass')
  var autoprefix = require('gulp-autoprefixer')
  var cssimport = require('gulp-cssimport')
  var cleanCSS = require('gulp-clean-css')

  gulp.src('src/css/styles.scss')
    .pipe(sass())
    .pipe(autoprefix('last 2 versions'))
    .pipe(cssimport())
    .pipe(cleanCSS({ level: { 1: { specialComments: 0 }}}))
    .pipe(gulp.dest('public/css/'))
    .pipe(livereload())
})

gulp.task('js', function () {
  var browserify = require('browserify')
  var source = require('vinyl-source-stream')
  var buffer = require('vinyl-buffer')
  var uglify = require('gulp-uglify')
  var sourcemaps = require('gulp-sourcemaps')
  var es = require('event-stream')

  var entries = [
    'main',
    'map'
  ]

  // Create a stream array
  var tasks = entries.map(function (entry) {
    // see package.json for transforms
    return browserify({ entries: ['src/js/' + entry + '.js'] })
      .bundle()
      .pipe(source(entry + '.min.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
        // Add transformation tasks to the pipeline here.
        .pipe(uglify())
        .on('error', gutil.log)
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('public/js/'))
  })

  return es.merge.apply(null, tasks)
})

gulp.task('watch', function () {
  livereload.listen()
  gulp.watch(paths.styles, ['css'])
  gulp.watch(paths.scripts, ['js'])
})
