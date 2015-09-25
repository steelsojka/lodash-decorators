import config from '../config';
import gulp from 'gulp';
import mocha from 'gulp-mocha';
import plumber from 'gulp-plumber';

function handleError(err) {
  console.log(err.toString());
  this.emit('end'); // jshint ignore:line
}

export default gulp.task('mocha:unit', () => {
  return gulp.src(config.paths.tests.unit, {read: false})
    .pipe(mocha({
      reporter: 'spec'
    }))
    .on('error', handleError);
});
