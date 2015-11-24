import forOwn from 'lodash/object/forOwn';
import assign from 'lodash/object/assign';
import functions from 'lodash/function';

import bind from './bind/bind';
import tap from './tap';
import bindAll from './bind/bindAll';
import mixin from './mixin';
import attempt from './attempt';
import { createDecorator, createInstanceDecorator } from './decoratorFactory';
import { applicators } from './Applicator';
import normalizeExport from './utils/normalizeExport';

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
  tap,
  bindAll,
  mixin,
  attempt
});

export default normalizeExport(result);
