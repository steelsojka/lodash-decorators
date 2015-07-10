'use strict';

import { createDecorator } from './decoratorFactory';
import { applicators } from './Applicator';
import returnAtIndex from './utils/returnAtIndex';

/**
 * Returns the first argument from the function regardless of
 * the decorated functions return value.
 */
export default createDecorator(function tapDecorator(fn) {
  return returnAtIndex(fn, 0);
}, applicators.single);
