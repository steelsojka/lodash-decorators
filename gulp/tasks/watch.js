import config from '../config';
import gulp from 'gulp';
import _ from 'lodash';

export default gulp.task('watch', ['lint'], () => {
  gulp.watch(config.paths.lint, ['lint']);
});
