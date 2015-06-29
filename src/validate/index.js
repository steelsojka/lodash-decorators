'use strict';

import every from 'lodash/collection/every';

import { createDecorator } from '../decoratorFactory';

export default createDecorator(validateDecorator);

function validateDecorator(fn, ...args) {
  const validators = args
    .map(arg => Array.isArray(arg) ? arg : Array.of(arg))
    .map(fns => arg => every(fns, fn => fn(arg)));

  return function validator(...args) {
    validate(args);
    return fn.call(this, ...args);
  };

  function validate(args) {
    for (let i = 0, len = args.length; i < len; i++) {
      if (validators[i] && !validators[i](args[i])) {
        throw new TypeError(`Argument did not pass validation. Got ${typeof arg}.`);
      }
    }
  }
}
