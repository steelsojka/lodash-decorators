'use strict';

import { createDecorator } from './decoratorFactory';
import { applicators } from './Applicator';
import returnAtIndex from './utils/returnAtIndex';

export default createDecorator(function tapDecorator(fn) {
  return returnAtIndex(fn, 0);
}, applicators.single);
