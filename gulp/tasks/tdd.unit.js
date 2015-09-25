import config from '../config';
import gulp from 'gulp';

export default gulp.task('tdd:unit', ['lint', 'mocha:unit'], () => {
  gulp.watch([config.paths.src, config.paths.tests.unit], ['mocha:unit']);
});
