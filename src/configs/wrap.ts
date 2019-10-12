import wrap = require('lodash/wrap');

import { DecoratorConfig } from '../factory';
import { WrapApplicator } from '../applicators';

export default new DecoratorConfig(wrap, new WrapApplicator());
