'use strict';

import _ from 'lodash';
import { createDecorator, createInstanceDecorator } from './decoratorFactory';

const methods = {
  instance: {
    pre: [
      'debounce',
      'throttle',
      'memoize',
      'once'
    ],
    post: [
      'after',
      'before'
    ]
  },
  proto: {
    pre: [
      'curry',
      'curryRight',
      'negate',
      'rearg'
    ],
    partial: [
      'partial',
      'partialRight'
    ],
    wrap: [
      'wrap'
    ],
    compose: [
      'compose'
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

export default result;
