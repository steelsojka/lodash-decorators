'use strict';

import _ from 'lodash';
import getter from './getter';
import bind from './bind';
import { createDecorator, createInstanceDecorator } from './decoratorFactory';
import settings from './settings';

const methods = {
  instance: {
    single: [
      'once'
    ],
    pre: [
      'debounce',
      'throttle',
      'memoize'
    ],
    post: [
      'after',
      'before'
    ]
  },
  proto: {
    single: [
      'spread',
      'rearg',
      'negate'
    ],
    pre: [
      'ary',
      'curry',
      'curryRight',
      'restParam'
    ],
    partial: [
      'partial',
      'partialRight'
    ],
    wrap: [
      'wrap'
    ],
    compose: [
      'compose',
      'flow',
      'flowRight',
      'backflow'
    ],
    partialed: [
      'delay',
      'defer'
    ]
  }
};

let result = {};

_.forOwn(methods, (hash, createType) => {
  _.forOwn(hash, (list, type) => {
    result = list.reduce((res, fnName) => {
      res[fnName] = createType === 'instance'
        ? createInstanceDecorator(_, fnName, type)
        : createDecorator(_, fnName, type);

      return res;
    }, result);
  });
});

// All other decorators
_.assign(result, {
  getter,
  bind
});

// Provide aliases @memoize => @Memoize
// This is for users who prefer capitalized decorators and
// can prevent naming collissions.
_.forOwn(result, (value, key) => result[_.capitalize(key)] = value);

export default _.assign(result, { settings });
