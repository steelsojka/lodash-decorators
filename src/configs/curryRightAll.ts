import curryRight = require('lodash/curryRight');

import { DecoratorConfig } from '../factory';
import { PreValueApplicator } from '../applicators';

export default new DecoratorConfig(curryRight, new PreValueApplicator(), {
  optionalParams: true
});
