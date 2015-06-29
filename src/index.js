'use strict';

import _ from 'lodash';
import bind from './bind';
import tap from './tap';
import { createDecorator, createInstanceDecorator } from './decoratorFactory';

import {
  SINGLE, 
  PRE, 
  POST, 
  PROTO, 
  WRAP, 
  COMPOSE, 
  PARTIALED,
  PARTIAL,
  INSTANCE
} from './applyTypes';

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

_.forOwn(methods, (hash, createType) => {
  _.forOwn(hash, (list, type) => {
    result = list.reduce((res, fnName) => {
      res[fnName] = createType === INSTANCE
        ? createInstanceDecorator(_[fnName], type)
        : createDecorator(_[fnName], type);

      return res;
    }, result);
  });
});

// All other decorators
_.assign(result, {
  bind,
  tap
});

// Provide aliases @memoize => @Memoize
// This is for users who prefer capitalized decorators and
// can prevent naming collissions.
_.forOwn(result, (value, key) => result[_.capitalize(key)] = value);

export default result;
