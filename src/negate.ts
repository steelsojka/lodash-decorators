import negate = require('lodash/negate');

import { DecoratorConfig, DecoratorFactory, LodashMethodDecorator } from './factory';
import { PreValueApplicator } from './applicators';

export const Negate: () => LodashMethodDecorator = DecoratorFactory.createDecorator(
  new DecoratorConfig(negate, new PreValueApplicator())
);
export { Negate as negate };
export default Negate;
