import flip = require('lodash/flip');

import { DecoratorConfig } from '../factory';
import { PartialValueApplicator } from '../applicators';

export default new DecoratorConfig(flip, new PartialValueApplicator(), {
  property: true
});
