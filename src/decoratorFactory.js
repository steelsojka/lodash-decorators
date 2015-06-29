'use strict';

import { forOwn, isFunction, partial } from 'lodash';
import CompositeKeyWeakMap from './CompositeKeyWeakMap';

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

/**
 * Used to copy over meta data from function to function.
 * If meta data is attached to a function. This can get lost
 * when wrapping functions. This tries to persist that.
 */
export function copyMetaData(from, to) {
  forOwn(from, (value, key) => to[key] = value);
  return to;
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
        descriptor.get = TYPE_MAP[type](method, target, get, ...args);
        copyMetaData(get, descriptor.get);
      } else if (value) {
        descriptor.value = TYPE_MAP[type](method, target, value, ...args); 
        copyMetaData(value, descriptor.value);
      }

      return descriptor;
    };
  };
}

export function createInstanceDecorator(method, type = PRE) {
  const objectMap = new CompositeKeyWeakMap();

  return type === SINGLE ? wrapper() : wrapper;

  function wrapper(...args) {
    return function decorator(target, name, descriptor) {
      const { value, get } = descriptor;
      const action = TYPE_MAP[type];
      let toWrap = get ? get : value;

      if (get) {
        descriptor.get = copyMetaData(toWrap, instanceDecoratorWrapper);
      } else {
        descriptor.value = copyMetaData(toWrap, instanceDecoratorWrapper); 
      }

      return descriptor;
        
      function instanceDecoratorWrapper(...methodArgs) {
        if (!objectMap.has([this, toWrap])) {
          objectMap.set([this, toWrap], action(method, this, toWrap, ...args));
        }

        const fn = objectMap.get([this, toWrap]);

        return fn.apply(this, methodArgs);
      };
    };
  };
}
