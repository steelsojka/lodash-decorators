import attempt = require('lodash/attempt');
import partial = require('lodash/partial');

import { DecoratorConfig } from '../factory';
import { PreValueApplicator } from '../applicators';

export default new DecoratorConfig(
  (fn: () => void) => partial(attempt, fn),
  new PreValueApplicator(),
  {
    optionalParams: true
  }
);
