'use strict';

import { isFunction } from 'lodash';
import settings from './settings';

const TYPE_MAP = {
  // Methods where the function is the last argument or the first
  // and all other arguments come before or after.
  post: (fn, target, value, ...args) => fn(...args, value),
  pre: (fn, target, value, ...args) => fn(value, ...args),

  // Partials are slightly different. They partial an existing function
  // on the object referenced by string name.
  partial: (fn, target, value, ...args) => fn(target[args[0]], ...args.slice(1)),

  // Wrap is a different case since the original function value
  // needs to be given to the wrap method.
  wrap: (fn, target, value, ...args) => fn(target[args[0]], value),
  replace: (fn, target, value, ...args) => fn(...args),

  // Calls the function with key functions and the value
  compose: (fn, target, value, ...args) => fn(value, ...args.map(method => target[method]))
};

TYPE_MAP.single = TYPE_MAP.pre;

/**
 * Creates a generic decorator for a method on an object.
 *
 * @param {Object} root The root object the method resides on.
 * @param {String} method The method.
 * @param {String} [type=post] How to wrap the function.
 * @returns {Function} Decorator function
 */
function createDecorator(root, method, type = 'pre') {
  return type === 'single' ? wrapper() : wrapper;

  function wrapper(...args) {
    return function decorator(target, name, descriptor) {
      const { value, get } = descriptor;
      const result = TYPE_MAP[type](root[method], target, (get || value), ...args);

      if (get) {
        descriptor.get = result;
      } else if (value) {
        descriptor.value = result;
      }

      return descriptor;
    };
  };
}

function createInstanceDecorator(root, method, type = 'pre') {
  return type === 'single' ? wrapper() : wrapper;

  function wrapper(...args) {
    return function decorator(target, name, descriptor) {
      const { value, get } = descriptor;
      const action = TYPE_MAP[type];
      const getterAnnotation = `${settings.annotationPrefix}isGetter`;

      if (get) {
        getter[getterAnnotation] = get[getterAnnotation];
      }

      return { get: getter };

      function getter() {
        const isGetter = Boolean(getter[getterAnnotation]);
        const newDescriptor = { configurable: true };

        if (isFunction(get)) {
          const toWrap = isGetter ? get : get.call(this);

          newDescriptor.get = action(root[method], this, toWrap, ...args);

          Object.defineProperty(this, name, newDescriptor);

          return isGetter ? newDescriptor.get() : newDescriptor.get;
        }

        newDescriptor.value = action(root[method], this, value, ...args);
        Object.defineProperty(this, name, newDescriptor);

        return newDescriptor.value;
      }
    };
  };
}

export default {
  createDecorator,
  createInstanceDecorator
};
