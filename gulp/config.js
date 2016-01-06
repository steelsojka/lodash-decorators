export default {
  paths: {
    lint: ['src/**/*.js'],
    src: 'src/**/*.js',
    tests: {
      unit: 'test/**/*.spec.js'
    },
    dist: './',
    published: [
      'bind/**',
      'extensions/**',
      'utils/**',
      'validate/**',
      'Applicator.js',
      'attempt.js',
      'decoratorFactory.js',
      'index.js',
      'mixin.js',
      'tap.js',
    ]
  }
};
