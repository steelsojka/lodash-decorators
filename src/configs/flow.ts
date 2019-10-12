import flow = require('lodash/flow');

import { DecoratorConfig } from '../factory';
import { ComposeApplicator } from '../applicators';

export default new DecoratorConfig(
  flow,
  new ComposeApplicator({ post: true }),
  { property: true }
);
