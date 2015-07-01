'use strict';

import config from '../config';
import gulp from 'gulp';
import gulpif from 'gulp-if';
import eslint from 'gulp-eslint';
import plumber from 'gulp-plumber';
import args from '../args';

export default gulp.task('lint', () => {
  return gulp.src(config.paths.lint)
    .pipe(gulpif(!args.ci, plumber(handleError)))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(gulpif(args.ci, eslint.failAfterError()));
});

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}
