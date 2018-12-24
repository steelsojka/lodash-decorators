import ary = require('lodash/ary');

import { DecoratorConfig } from '../factory/DecoratorConfig';
import { PreValueApplicator } from '../applicators/PreValueApplicator';

export default new DecoratorConfig(ary, new PreValueApplicator());
