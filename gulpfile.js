var gulp = require('gulp');
var sass = require('gulp-sass');

var browserSync = require('browser-sync').create();
var cssnano = require('gulp-cssnano');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');

//Utilities
var notify = require('gulp-notify');

//Styles
gulp.task('scss', function () {
  return gulp.src('./styles/**/*.scss')
    .pipe(sourcemaps.init())
      .pipe(sass.sync().on('error', sass.logError))
      .pipe(autoprefixer({browsers: ['last 2 versions']}))
      .pipe(cssnano())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./assets/styles'))
    .pipe(notify({ message: 'Styles Compiled' }));
});

// Watch the scss
gulp.task('watch', function () {
  return gulp.watch('./styles/**/*.scss', ['scss']);
});

// Run default, then startup a browserSync server and watch for changes.
gulp.task('serve', ['scss'], function(){
  browserSync.init({
    server: {
      baseDir: './',
      serveStaticOptions: {
          extensions: ['html']
      },
    },
    files: ["assets/styles/main.css", "index.html"]
  });

  //watch the sass
  gulp.watch(['./styles/**/*.scss'], ['scss']);
});

gulp.task('default', ['watch']);
