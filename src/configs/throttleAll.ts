import throttle = require('lodash/throttle');

import { DecoratorConfig } from '../factory';
import { PreValueApplicator } from '../applicators';

export default new DecoratorConfig(throttle, new PreValueApplicator(), {
  setter: true
});
