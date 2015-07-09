'use strict';

import gulp from 'gulp';
import { spawn } from 'child_process';
import { version } from '../../package.json';

const SPAWN_OPTIONS = { stdio: 'inherit' };

gulp.task('publish', ['stage'], done => {
  spawn('npm', ['publish', 'stage'], SPAWN_OPTIONS).on('close', () => {
    spawn('git', ['tag', version], SPAWN_OPTIONS).on('close', () => {
      spawn('git', ['push', '--tags'], SPAWN_OPTIONS).on('close', done);
    });
  });
});
