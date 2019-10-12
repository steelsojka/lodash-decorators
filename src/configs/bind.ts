import bind = require('lodash/bind');

import { DecoratorConfig } from '../factory';
import { BindApplicator } from '../applicators';

export default new DecoratorConfig(bind, new BindApplicator(), {
  optionalParams: true
});
