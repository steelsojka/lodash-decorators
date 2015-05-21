'use strict';

import config from '../config';
import gulp from 'gulp';

export default gulp.task('tdd:unit', ['jshint', 'mocha:unit'], () => {
  gulp.watch([config.paths.src, config.paths.tests.unit], ['mocha:unit']);
});
