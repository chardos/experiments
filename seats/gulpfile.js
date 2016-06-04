var gulp = require('gulp');
var babel = require('gulp-babel');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var include = require('gulp-include');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');

var cssPath = 'src/**/*.scss';
function swallowError (error) {
  console.log(error.toString());
  this.emit('end');
}

gulp.task('default', function(){

});

gulp.task('tests', function(){
  gulp.src('test/src/*.{js,jsx}')
    // .pipe(browserify({
    //   insertGlobals : true,
    //   debug : !gulp.env.production
    // }))
    .pipe(include())
    .pipe(babel({
        presets: ['es2015']
    }))
    .on('error', swallowError)
    .pipe(gulp.dest('test/dist'))
})

gulp.task('scripts', function(){
  gulp.src('src/js/life_raft.jsx')
      .pipe(browserify({
  		  insertGlobals : true,
  		  debug : !gulp.env.production
  		}))
      .pipe(include())
      .pipe(babel({
          presets: ['es2015']
      }))
      .on('error', swallowError)
      .pipe(uglify())
      .pipe(gulp.dest('dist/js'))
});

gulp.task("sass", function () {
    gulp.src(cssPath)
    .pipe(sass(
        {"bundleExec": true}
    ))
    .on('error', swallowError)
    .pipe(gulp.dest("dist"));
});

gulp.watch('test/src/*.{js,jsx}', ['tests']);
gulp.watch('src/js/**/*.{js,jsx}', ['scripts']);
gulp.watch(cssPath, ['sass']);
