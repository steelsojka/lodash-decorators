'use strict';

import every from 'lodash/collection/every';
import { createDecorator } from '../decoratorFactory';
import log from './log';

export default function createValidateDecorator(validateFactory) {
  return createDecorator(function validateDecorator(fn, ...args) {
    const validators = args
      .map(arg => Array.isArray(arg) ? arg : Array.of(arg))
      .map(fns => arg => every(fns, fn => fn(arg)));

    return validateFactory(fn, validate);

    function validate(...args) {
      for (let i = 0, len = args.length; i < len; i++) {
        if (validators[i] && !validators[i](args[i])) {
          throw new TypeError(log(`Argument did not pass validation. Got ${typeof arg}.`));
        }
      }
    }
  });
}
