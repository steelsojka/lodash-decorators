'use strict';

import gulp from 'gulp';
import config from '../config';
import del from 'del';

gulp.task('stage', ['clean:stage'], () => {
  gulp.src(config.paths.published)
    .pipe(gulp.dest(config.paths.stage));
});

gulp.task('clean:stage', done => {
  del([config.paths.stage], done);
});
