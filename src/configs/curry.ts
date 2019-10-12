import curry = require('lodash/curry');

import { DecoratorConfig } from '../factory';
import { PreValueApplicator } from '../applicators';

export default new DecoratorConfig(curry, new PreValueApplicator(), {
  bound: true,
  optionalParams: true
});
