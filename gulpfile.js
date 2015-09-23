var gulp = require('gulp')
  , file = require('gulp-file');
 
gulp.task('gulpfile.js', function() {
  var str = primus.library();
 
  return gulp.src('scripts/**.js')
    .pipe(file('dbtest.js', str))
    .pipe(gulp.dest('dist'));
});
