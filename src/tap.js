'use strict';

import { createDecorator } from './decoratorFactory';
import { applicators } from './Applicator';

export default createDecorator(function tapDecorator(fn) {
  return function(...args) {
    fn.call(this, ...args);
    return args[0];
  };
}, applicators.single);
