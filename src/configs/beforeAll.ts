import before = require('lodash/before');

import { DecoratorConfig } from '../factory';
import { PostValueApplicator } from '../applicators';

export default new DecoratorConfig(before, new PostValueApplicator(), {
  setter: true
});
