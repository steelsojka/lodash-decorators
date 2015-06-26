'use strict';

import { forOwn, isFunction, partial } from 'lodash';
import settings from './settings';

import {
  SINGLE, 
  PRE, 
  POST, 
  PROTO, 
  WRAP, 
  COMPOSE, 
  PARTIALED,
  PARTIAL,
  REPLACE,
  INSTANCE
} from './applyTypes';

const TYPE_MAP = {
  // Methods where the function is the last argument or the first
  // and all other arguments come before or after.
  [POST]: (fn, target, value, ...args) => fn(...args, value),
  [PRE]: (fn, target, value, ...args) => fn(value, ...args),

  // Partials are slightly different. They partial an existing function
  // on the object referenced by string name.
  [PARTIAL]: (fn, target, value, ...args) => fn(resolveFunction(args[0], target), ...args.slice(1)),

  // Wrap is a different case since the original function value
  // needs to be given to the wrap method.
  [WRAP]: (fn, target, value, ...args) => fn(resolveFunction(args[0], target), value),
  [REPLACE]: (fn, target, value, ...args) => fn(...args),

  // Calls the function with key functions and the value
  [COMPOSE]: (fn, target, value, ...args) => fn(value, ...args.map(method => resolveFunction(method, target))),
  [PARTIALED]: (fn, target, value, ...args) => partial(fn, value, ...args)
};

TYPE_MAP[SINGLE] = TYPE_MAP[PRE];

function resolveFunction(method, target) {
  return isFunction(method) ? method : target[method];
}

export function isGetter(getter) {
  return Boolean(getter[`${settings.annotationPrefix}isGetter`]);
}

/**
 * Used to copy over meta data from function to function.
 * If meta data is attached to a function. This can get lost
 * when wrapping functions. This tries to persist that.
 */
export function copyMetaData(from, to) {
  forOwn(from, (value, key) => to[key] = value);
}

/**
 * Creates a generic decorator for a method on an object.
 *
 * @param {Object} root The root object the method resides on.
 * @param {String} method The method.
 * @param {String} [type=post] How to wrap the function.
 * @returns {Function} Decorator function
 */
export function createDecorator(method, type = PRE) {
  return type === SINGLE ? wrapper() : wrapper;

  function wrapper(...args) {
    return function decorator(target, name, descriptor) {
      const { value, get } = descriptor;

      if (get) {
        const toWrap = isGetter(get) ? get : get.call(this);
        descriptor.get = TYPE_MAP[type](method, target, toWrap, ...args);
        copyMetaData(toWrap, descriptor.get);
      } else if (value) {
        descriptor.value = TYPE_MAP[type](method, target, value, ...args); 
        copyMetaData(value, descriptor.value);
      }

      return descriptor;
    };
  };
}

export function createInstanceDecorator(method, type = 'pre') {
  return type === SINGLE ? wrapper() : wrapper;

  function wrapper(...args) {
    return function decorator(target, name, descriptor) {
      const { value, get } = descriptor;
      const action = TYPE_MAP[type];
      const getterAnnotation = `${settings.annotationPrefix}isGetter`;

      if (get) {
        copyMetaData(get, getter);
      }

      return { get: getter, set: setter, configurable: true };

      function setter(value) {
        Object.defineProperty(this, name, {
          configurable: true,
          value,
          writable
        });
      }

      function getter() {
        const isGetter = Boolean(getter[getterAnnotation]);
        const newDescriptor = { configurable: true };

        if (isFunction(get)) {
          const toWrap = isGetter ? get : get.call(this);

          newDescriptor.get = action(method, this, toWrap, ...args);
          copyMetaData(toWrap, newDescriptor.get);

          Object.defineProperty(this, name, newDescriptor);

          return isGetter ? newDescriptor.get() : newDescriptor.get;
        }

        newDescriptor.value = action(method, this, value, ...args);
        copyMetaData(value, newDescriptor.value);

        Object.defineProperty(this, name, newDescriptor);

        return newDescriptor.value;
      }
    };
  };
}
