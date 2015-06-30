'use strict';

import createValidateDecorator from '../utils/createValidateDecorator';

export default createValidateDecorator(function validateReturn(fn, validateFn) {
  return function(...args) {
    let result = fn.call(this, ...args);

    validateFn(result);

    return result;
  };
});
