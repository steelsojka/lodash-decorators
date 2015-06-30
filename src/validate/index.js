'use strict';

import normalizeExport from '../utils/normalizeExport';

import validate from './validate';
import validateReturn from './validateReturn';

export default normalizeExport({
  validate,
  validateReturn
});
