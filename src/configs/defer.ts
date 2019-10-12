import defer = require('lodash/defer');

import { DecoratorConfig } from '../factory';
import { InvokeApplicator } from '../applicators';

export default new DecoratorConfig(defer, new InvokeApplicator(), {
  optionalParams: true,
  setter: true
});
