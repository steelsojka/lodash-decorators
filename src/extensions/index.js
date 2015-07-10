'use strict';

import normalizeExport from '../utils/normalizeExport';

import configurable from './configurable';
import enumerable from './enumerable';
import returnsArg from './returnsArg';
import writable from './writable';
import deprecated from './deprecated';

export default normalizeExport({
  configurable,
  enumerable,
  returnsArg,
  writable,
  deprecated,
  readonly: writable(false),
  nonenumerable: enumerable(false),
  nonconfigurable: configurable(false)
});
