'use strict';

import isFunction from 'lodash/lang/isFunction';
import { createDecorator } from '../decoratorFactory';
import { applicators } from '../Applicator';
import wrapConstructor from '../utils/wrapConstructor';

const methodDecorator = createDecorator(function deprecatedMethod(fn) {
  return function(...args) {
    deprecated.methodAction(fn);

    return fn.apply(this, args);
  };
}, applicators.single);

defineFunctionProp(deprecated, 'classAction', defaultClassAction);
defineFunctionProp(deprecated, 'methodAction', defaultMethodAction);

/**
 * Warns when a deprecated function is being used.
 */
export default function deprecated(target, name, descriptor) {
  // For classes
  if (isFunction(target) && !name && !descriptor) {
    return wrapConstructor(target, function(Ctor, ...args) {
      deprecated.classAction(target);

      return Ctor.apply(this, args);
    });
  }

  return methodDecorator(target, name, descriptor);
}

function defineFunctionProp(target, name, defaultAction) {
  Object.defineProperty(target, name, {
    configurable: false,
    get: () => defaultAction,
    set: val => {
      if (isFunction(val)) {
        defaultAction = val;
      }
    }
  });
}

function defaultClassAction(target) {
  warn(`Class ${target.name} is deprecated. This feature will be removed in the future.`);
}

function defaultMethodAction(fn) {
  warn(`Method ${fn.name} is deprecated. This feature will be removed in the future.`);
}

function warn(message = '') {
  if (console && console.warn) {
    console.warn(message);
  }
}
