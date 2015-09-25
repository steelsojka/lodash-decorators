import config from '../config';
import gulp from 'gulp';
import runSequence from 'run-sequence';
import args from '../args';

export default gulp.task('ci', done => {
  args.ci = true;
  runSequence('lint', 'mocha:unit', 'build', done);
});
