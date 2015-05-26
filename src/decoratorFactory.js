'use strict';

import { forOwn, isFunction, partial } from 'lodash';
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
  compose: (fn, target, value, ...args) => fn(value, ...args.map(method => target[method])),
  partialed: (fn, target, value, ...args) => partial(fn, value, ...args)
};

TYPE_MAP.single = TYPE_MAP.pre;

function isGetter(getter) {
  return Boolean(getter[`${settings.annotationPrefix}isGetter`]);
}

/**
 * Used to copy over meta data from function to function.
 * If meta data is attached to a function. This can get lost
 * when wrapping functions. This tries to persist that.
 */
function copyMetaData(from, to) {
  forOwn(from, (value, key) => to[key] = from[key]);
}

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

      if (get) {
        const toWrap = isGetter(get) ? get : get.call(this);
        descriptor.get = TYPE_MAP[type](root[method], target, toWrap, ...args);
        copyMetaData(toWrap, descriptor.get);
      } else if (value) {
        descriptor.value = TYPE_MAP[type](root[method], target, value, ...args); 
        copyMetaData(value, descriptor.get);
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
        copyMetaData(get, getter);
      }

      return { get: getter, configurable: true };

      function getter() {
        const isGetter = Boolean(getter[getterAnnotation]);
        const newDescriptor = { configurable: true };

        if (isFunction(get)) {
          const toWrap = isGetter ? get : get.call(this);

          newDescriptor.get = action(root[method], this, toWrap, ...args);
          copyMetaData(toWrap, newDescriptor.get);

          Object.defineProperty(this, name, newDescriptor);

          return isGetter ? newDescriptor.get() : newDescriptor.get;
        }

        newDescriptor.value = action(root[method], this, value, ...args);
        copyMetaData(value, newDescriptor.value);

        Object.defineProperty(this, name, newDescriptor);

        return newDescriptor.value;
      }
    };
  };
}

export default {
  createDecorator,
  createInstanceDecorator,
  copyMetaData
};
