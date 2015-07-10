'use strict';

import assign from 'lodash/object/assign';
import isFunction from 'lodash/lang/isFunction';
import partial from 'lodash/function/partial';

const applicators = {
  // Methods where the function is the last argument or the first
  // and all other arguments come before or after.
  post: (fn, target, value, ...args) => fn(...args, value),
  pre: (fn, target, value, ...args) => fn(value, ...args),

  // Partials are slightly different. They partial an existing function
  // on the object referenced by string name.
  partial: (fn, target, value, ...args) => {
    return function(...invokeArgs) {
      return fn(Applicator.resolveFunction(args[0], target), ...args.slice(1)).apply(this, invokeArgs);
    };
  },

  // Wrap is a different case since the original function value
  // needs to be given to the wrap method.
  wrap: (fn, target, value, fnName) => {
    return function(...invokeArgs) {
      return fn(Applicator.resolveFunction(fnName, target), value).apply(this, invokeArgs);
    };
  },

  replace: (fn, target, value, ...args) => fn(...args),

  // Calls the function with key functions and the value
  compose: (fn, target, value, ...args) => {
    return function(...invokeArgs) {
      return fn(value, ...args.map(method => Applicator.resolveFunction(method, target))).apply(this, invokeArgs);
    };
  },

  partialed: (fn, target, value, ...args) => partial(fn, value, ...args),
  single: (fn, target, value, ...args) => applicators.pre(fn, target, value, ...args)
};

/**
 * Applys a specific method signature onto a set of arguments. This is due to the various different APIs
 * these functions provide.
 */
const Applicator = {
  /**
   * Invokes an applicator method.
   *
   * @param {Function} applicator The applicator function.
   * @param {Function} method The function the applicator if being applied to.
   * @param {Object} target The target object given to the decorator.
   * @param {Function} value The value the decorator is being applied to.
   * @param {...*} [args] Any additional arguments passed to the applicator.
   * @returns {Function} A function with __method__ applied to __value__
   *   with the __applicator__s signature.
   */
  invoke(applicator, method, target, value, ...args) {
    return applicator(method, target, value, ...args);
  },

  /**
   * Resolves a function on the current target object.
   *
   * @param {Function|String} method The method or method name.
   * @param {Object} [target] The target object to resolve from.
   * @returns {Function} The resolved function.
   */
  resolveFunction(method, target) {
    return isFunction(method) ? method : target[method];
  }
};

assign(Applicator, { applicators });

export default Applicator;
