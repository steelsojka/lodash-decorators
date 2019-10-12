import debounce = require('lodash/debounce');

import { DecoratorConfig } from '../factory';
import { PreValueApplicator } from '../applicators';

export default new DecoratorConfig(debounce, new PreValueApplicator(), {
  setter: true
});
