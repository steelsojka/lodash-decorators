import ary = require('lodash/ary');

import { DecoratorConfig } from '../factory';
import { PreValueApplicator } from '../applicators';

export default new DecoratorConfig(ary, new PreValueApplicator());
