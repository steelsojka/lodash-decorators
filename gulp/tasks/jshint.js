'use strict';

import config from '../config';
import gulp from 'gulp';
import jshint from 'gulp-jshint';
import stylish from 'jshint-stylish';
import plumber from 'gulp-plumber';

export default gulp.task('jshint', () => {
  return gulp.src(config.paths.lint)
    .pipe(plumber(handleError))
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

function handleError(err) {
  console.log(err.toString());

  /*jshint validthis:true */
  this.emit('end');
}
