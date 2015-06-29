'use strict';

import gulp from 'gulp';
import config from '../config';
import del from 'del';
import { execSync } from 'child_process';

gulp.task('stage', ['clean:stage'], () => {
  gulp.src(config.paths.published)
    .pipe(gulp.dest(config.paths.stage));
});

gulp.task('clean:stage', done => {
  del([config.paths.stage], done);
});

gulp.task('publish', ['stage'], done => {
  execSync(`npm publish ${config.paths.stage}`);
});
