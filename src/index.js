'use strict';

import capitalize from 'lodash/string/capitalize';
import forOwn from 'lodash/object/forOwn';
import assign from 'lodash/object/assign';
import functions from 'lodash/function';

import bind from './bind';
import tap from './tap';
import { createDecorator, createInstanceDecorator } from './decoratorFactory';
import Applicator from './Applicator';

const {
  SINGLE, 
  PRE, 
  POST, 
  PROTO, 
  WRAP, 
  COMPOSE, 
  PARTIALED,
  PARTIAL,
  INSTANCE
} = Applicator;

const methods = {
  [INSTANCE]: {
    [SINGLE]: [
      'once'
    ],
    [PRE]: [
      'debounce',
      'throttle',
      'memoize'
    ],
    [POST]: [
      'after',
      'before'
    ]
  },
  [PROTO]: {
    [SINGLE]: [
      'spread',
      'rearg',
      'negate'
    ],
    [PRE]: [
      'ary',
      'curry',
      'curryRight',
      'restParam'
    ],
    [PARTIAL]: [
      'partial',
      'partialRight'
    ],
    [WRAP]: [
      'wrap'
    ],
    [COMPOSE]: [
      'compose',
      'flow',
      'flowRight',
      'backflow'
    ],
    [PARTIALED]: [
      'delay',
      'defer'
    ]
  }
};

let result = {};

forOwn(methods, (hash, createType) => {
  forOwn(hash, (list, type) => {
    result = list.reduce((res, fnName) => {
      res[fnName] = createType === INSTANCE
        ? createInstanceDecorator(functions[fnName], type)
        : createDecorator(functions[fnName], type);

      return res;
    }, result);
  });
});

// All other decorators
assign(result, {
  bind,
  tap
});

// Provide aliases @memoize => @Memoize
// This is for users who prefer capitalized decorators and
// can prevent naming collissions.
forOwn(result, (value, key) => result[capitalize(key)] = value);

export default result;
