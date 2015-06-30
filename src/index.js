'use strict';

import capitalize from 'lodash/string/capitalize';
import forOwn from 'lodash/object/forOwn';
import assign from 'lodash/object/assign';
import functions from 'lodash/function';

import bind from './bind';
import tap from './tap';
import { createDecorator, createInstanceDecorator } from './decoratorFactory';
import { applicators } from './Applicator';

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
      'modArgs',
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

forOwn(methods, (hash, createType) => {
  forOwn(hash, (list, type) => {
    result = list.reduce((res, fnName) => {
      res[fnName] = createType === 'instance'
        ? createInstanceDecorator(functions[fnName], applicators[type])
        : createDecorator(functions[fnName], applicators[type]);

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
