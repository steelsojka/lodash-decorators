import partialRight = require('lodash/partialRight');

import { DecoratorConfig } from '../factory';
import { PartialApplicator } from '../applicators';

export default new DecoratorConfig(partialRight, new PartialApplicator(), {
  method: false,
  property: true
});
