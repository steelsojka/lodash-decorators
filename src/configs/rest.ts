import rest = require('lodash/rest');

import { DecoratorConfig } from '../factory';
import { PreValueApplicator } from '../applicators';

export default new DecoratorConfig(rest, new PreValueApplicator(), {
  optionalParams: true
});
