import negate = require('lodash/negate');

import { DecoratorConfig } from '../factory';
import { PartialValueApplicator } from '../applicators';

export default new DecoratorConfig(negate, new PartialValueApplicator(), {
  optionalParams: true,
  property: true
});
