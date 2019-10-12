import unary = require('lodash/unary');

import { DecoratorConfig } from '../factory';
import { PreValueApplicator } from '../applicators';

export default new DecoratorConfig(unary, new PreValueApplicator(), {
  optionalParams: true
});
