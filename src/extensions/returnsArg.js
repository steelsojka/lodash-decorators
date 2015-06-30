'use strict';

import { createDecorator } from '../decoratorFactory';
import { applicators } from '../Applicator';
import returnAtIndex from '../utils/returnAtIndex';

export default createDecorator(function returnsArg(fn, index = 0) {
  return returnAtIndex(fn, index);
});
