import after = require('lodash/after');

import { DecoratorConfig } from '../factory';
import { PostValueApplicator } from '../applicators';

export default new DecoratorConfig(after, new PostValueApplicator(), { setter: true });
