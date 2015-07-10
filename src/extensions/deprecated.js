'use strict';

import isFunction from 'lodash/lang/isFunction';
import { createDecorator } from '../decoratorFactory';
import { applicators } from '../Applicator';
import wrapConstructor from '../utils/wrapConstructor';

const methodDecorator = createDecorator(function deprecatedMethod(fn) {
  return function(...args) {
    warn(`Method ${fn.name} is deprecated. This feature will be removed in the future.`);

    return fn.apply(this, args);
  };
}, applicators.single);

/**
 * Warns when a deprecated function is being used.
 */
export default function deprecated(target, name, descriptor) {
  // For classes
  if (isFunction(target) && !name && !descriptor) {
    return wrapConstructor(target, function(Ctor, ...args) {
      warn(`Class ${target.name} is deprecated. This feature will be removed in the future.`);

      return Ctor.apply(this, args);
    });
  }

  return methodDecorator(target, name, descriptor);
}

function warn(message = '') {
  if (console && console.warn) {
    console.warn(message);
  }
}
