import memoize = require('lodash/memoize');

import { DecoratorConfig } from '../factory';
import { MemoizeApplicator } from '../applicators';

export default new DecoratorConfig(memoize, new MemoizeApplicator(), {
  optionalParams: true
});
