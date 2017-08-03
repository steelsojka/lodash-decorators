import unary = require('lodash/unary');

import { DecoratorConfig, DecoratorFactory, LodashMethodDecorator } from './factory';
import { PreValueApplicator } from './applicators';

export function Unary(): LodashMethodDecorator {
  return DecoratorFactory.createDecorator(
    new DecoratorConfig(unary, new PreValueApplicator())
  )();
}
export { Unary as unary };
export default Unary;
