'use strict';

import forOwn from 'lodash/object/forOwn';
import capitalize from 'lodash/string/capitalize';

// Provide aliases @memoize => @Memoize
// This is for users who prefer capitalized decorators and
// can prevent naming collissions.
export default function normalizeExport(exportObj) {
  forOwn(exportObj, (value, key) => exportObj[capitalize(key)] = value);
  return exportObj;
}
