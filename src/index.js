'use strict';

import _ from 'lodash';
import getter from './getter';
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
      'rearg',
      'negate'
    ],
    pre: [
      'curry',
      'curryRight'
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
      'flow'
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
_.assign(result, { getter });

// Provide aliases @memoize => @Memoize
// This is for users who prefer capitalized decorators and
// can prevent naming collissions.
_.forOwn(result, (value, key) => result[_.capitalize(key)] = value);

export default _.assign(result, { settings });
