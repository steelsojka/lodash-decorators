import flowRight = require('lodash/flowRight');

import { DecoratorConfig } from '../factory';
import { ComposeApplicator } from '../applicators';

export default new DecoratorConfig(
  flowRight,
  new ComposeApplicator({ post: false }),
  { property: true }
);
