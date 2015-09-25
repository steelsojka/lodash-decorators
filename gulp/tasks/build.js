import config from '../config';
import gulp from 'gulp';
import babel from 'gulp-babel';
import runSequence from 'run-sequence';
import del from 'del';

gulp.task('build', done => {
  runSequence('clean:build', 'compile', done);
});

gulp.task('clean:build', done => {
  del([`${config.paths.dist}`], done);
});

gulp.task('compile', () => {
  return gulp.src(config.paths.src)
    .pipe(babel())
    .pipe(gulp.dest(config.paths.dist));
});
