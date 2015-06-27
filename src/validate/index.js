'use strict';

import { chain, isArray, every, forEach } from 'lodash';
import { createDecorator } from '../decoratorFactory';

export default createDecorator(validateDecorator);

function validateDecorator(fn, ...args) {
  const validators = chain(args)
    .map(arg => isArray(arg) ? arg : [arg])
    .map(pipeline => arg => every(pipeline, fn => fn(arg)))
    .value();

  return function validator(...args) {
    validate(args)
    return fn.call(this, ...args);
  };

  function validate(args) {
    forEach(args, (arg, i) => {
      if (validators[i] && !validators[i](arg)) {
        throw new TypeError(`Argument did not pass validation. Got ${typeof arg}.`);
      }
    });
  }
}
