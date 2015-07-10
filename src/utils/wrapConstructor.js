'use strict';

import assignAll, { FUNCTION_PROPERTY_EXCLUDES } from './assignAll';

/**
 * Wraps a constructor and allows for modifying constructor flow.
 * Still retains same prototype and static properties.
 *
 * @param {Function} Ctor The constructor to wrap.
 * @param {Function} wrapper The wrapper to call. The wrapper
 *   gets called with the constructor and then any arguments
 *   passed into the constructor. It is the consumers responsibility
 *   to call `super` on the constructor.
 * @returns {Function} A new class constructor.
 */
export default function wrapConstructor(Ctor, wrapper) {
  function ClassWrapper(...args) {
    return wrapper.call(this, Ctor, ...args);
  }

  ClassWrapper.prototype = Ctor.prototype;

  return assignAll(ClassWrapper, Ctor, FUNCTION_PROPERTY_EXCLUDES);
}
