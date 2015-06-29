'use strict';

import assign from 'lodash/object/assign';
import isFunction from 'lodash/lang/isFunction';
import forOwn from 'lodash/object/forOwn';
import partial from 'lodash/function/partial';

const types = {
  SINGLE: 'single',
  PRE: 'pre',
  POST: 'post',
  PROTO: 'proto',
  WRAP: 'wrap',
  COMPOSE: 'compose',
  PARTIALED: 'partialed',
  PARTIAL: 'partial',
  REPLACE: 'replace',
  INSTANCE: 'instance'
};

const typeMap = {
  // Methods where the function is the last argument or the first
  // and all other arguments come before or after.
  [types.POST]: (fn, target, value, ...args) => fn(...args, value),
  [types.PRE]: (fn, target, value, ...args) => fn(value, ...args),

  // Partials are slightly different. They partial an existing function
  // on the object referenced by string name.
  [types.PARTIAL]: (fn, target, value, ...args) => fn(Applicator.resolveFunction(args[0], target), ...args.slice(1)),

  // Wrap is a different case since the original function value
  // needs to be given to the wrap method.
  [types.WRAP]: (fn, target, value, ...args) => fn(Applicator.resolveFunction(args[0], target), value),
  [types.REPLACE]: (fn, target, value, ...args) => fn(...args),

  // Calls the function with key functions and the value
  [types.COMPOSE]: (fn, target, value, ...args) => fn(value, ...args.map(method => Applicator.resolveFunction(method, target))),
  [types.PARTIALED]: (fn, target, value, ...args) => partial(fn, value, ...args),
  [types.SINGLE]: (fn, target, value, ...args) => typeMap[types.PRE](fn, target, value, ...args)
};

const Applicator = {
  invoke(type, method, target, value, ...args) {
    return typeMap[type](method, target, value, ...args);
  },

  resolveFunction(method, target) {
    return isFunction(method) ? method : target[method];
  },

  /**
  * Used to copy over meta data from function to function.
  * If meta data is attached to a function. This can get lost
  * when wrapping functions. This tries to persist that.
  */
  copyMetaData(from, to) {
    forOwn(from, (value, key) => to[key] = value);
    return to;
  }
};

assign(Applicator, types);

export default Applicator;
