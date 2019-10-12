import partial = require('lodash/partial');

import { DecoratorConfig } from '../factory';
import { PartialApplicator } from '../applicators';

export default new DecoratorConfig(partial, new PartialApplicator(), {
  method: false,
  property: true
});
