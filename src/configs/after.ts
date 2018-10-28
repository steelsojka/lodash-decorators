import after = require('lodash/after');

import { DecoratorConfig } from '../factory/DecoratorConfig';
import { PostValueApplicator } from '../applicators/PostValueApplicator';

export default new DecoratorConfig(after, new PostValueApplicator(), { setter: true });
