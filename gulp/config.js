export default {
  paths: {
    lint: ['src/**/*.js'],
    src: 'src/**/*.js',
    tests: {
      unit: 'test/**/*.spec.js'
    },
    dist: 'dist',
    stage: 'stage',
    published: [
      'dist/**/*', 
      'package.json',
      'README.md',
      'LICENSE'
    ]
  }
};
