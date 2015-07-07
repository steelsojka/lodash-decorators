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
    return (...invokeArgs) => fn(Applicator.resolveFunction(args[0], target), ...args.slice(1))(...invokeArgs);
  },

  // Wrap is a different case since the original function value
  // needs to be given to the wrap method.
  wrap: (fn, target, value, fnName) => {
    return (...invokeArgs) => fn(Applicator.resolveFunction(fnName, target), value)(...invokeArgs);
  },

  replace: (fn, target, value, ...args) => fn(...args),

  // Calls the function with key functions and the value
  compose: (fn, target, value, ...args) => {
    return (...invokeArgs) => fn(value, ...args.map(method => Applicator.resolveFunction(method, target)))(...invokeArgs);
  },

  partialed: (fn, target, value, ...args) => partial(fn, value, ...args),
  single: (fn, target, value, ...args) => applicators.pre(fn, target, value, ...args)
};

const Applicator = {
  invoke(applicator, method, target, value, ...args) {
    return applicator(method, target, value, ...args);
  },

  resolveFunction(method, target) {
    return isFunction(method) ? method : target[method];
  }
};

assign(Applicator, { applicators });

export default Applicator;
