'use strict';

export default {
  paths: {
    lint: ['**/*.js', '!node_modules/**', '!dist/**'],
    src: 'src/**/*.js',
    tests: {
      unit: 'test/**/*.spec.js'
    },
    dist: 'dist'
  }
};
