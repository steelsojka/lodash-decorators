import unary = require('lodash/unary');

import { DecoratorConfig, DecoratorFactory, LodashMethodDecorator } from './factory';
import { PreValueApplicator } from './applicators';

export const Unary: () => LodashMethodDecorator = DecoratorFactory.createDecorator(
  new DecoratorConfig(unary, new PreValueApplicator())
);
export { Unary as unary };
export default Unary;
