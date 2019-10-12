import rearg = require('lodash/rearg');

import { DecoratorConfig } from '../factory';
import { PartialValueApplicator } from '../applicators';

export default new DecoratorConfig(rearg, new PartialValueApplicator(), {
  property: true
});
