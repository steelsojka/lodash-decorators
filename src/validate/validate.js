import createValidateDecorator from '../utils/createValidateDecorator';

export default createValidateDecorator(function validate(fn, validateFn) {
  return function(...args) {
    validateFn(...args);
    return fn.call(this, ...args);
  };
});
