'use strict';

import { createDecorator } from './decoratorFactory';
import { SINGLE } from './applyTypes';

export default createDecorator(function tapDecorator(fn) {
  return function(...args) {
    fn.call(this, ...args);
    return args[0];
  };
}, SINGLE);
