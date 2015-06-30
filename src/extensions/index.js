'use strict';

import normalizeExport from '../utils/normalizeExport';

import configurable from './configurable';
import enumerable from './enumerable';
import returnsArg from './returnsArg';
import writable from './writable';

export default normalizeExport({
  configurable,
  enumerable,
  returnsArg,
  writable
});
