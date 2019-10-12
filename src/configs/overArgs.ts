import overArgs = require('lodash/overArgs');

import { DecoratorConfig } from '../factory';
import { PreValueApplicator } from '../applicators';

export default new DecoratorConfig(overArgs, new PreValueApplicator(), {
  setter: true
});
