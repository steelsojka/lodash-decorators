import { assignAll } from './assignAll';

const PROPERTY_EXCLUDES = [
  'length',
  'name',
  'arguments',
  'called',
  'prototype'
];

/**
 * Wraps a constructor in a wrapper function and copies all static properties
 * and methods to the new constructor.
 * @export
 * @param {Function} Ctor
 * @param {(Ctor: Function, ...args: any[]) => any} wrapper
 * @returns {Function}
 */
export function wrapConstructor(Ctor: Function, wrapper: (Ctor: Function, ...args: any[]) => any): Function {
  function ConstructorWrapper(...args: any[]) {
    return wrapper.call(this, Ctor, ...args);
  }

  ConstructorWrapper.prototype = Ctor.prototype;

  return assignAll(ConstructorWrapper, Ctor, PROPERTY_EXCLUDES);
}
