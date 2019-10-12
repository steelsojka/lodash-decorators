import spread = require('lodash/spread');

import { DecoratorConfig } from '../factory';
import { PreValueApplicator } from '../applicators';

export default new DecoratorConfig(spread, new PreValueApplicator(), {
  optionalParams: true
});
