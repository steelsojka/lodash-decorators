import unary = require('lodash/unary');

import { DecoratorConfig, DecoratorFactory, LodashMethodDecorator } from './factory/index';
import { PreValueApplicator } from './applicators/index';

const decorator = DecoratorFactory.createDecorator(
  new DecoratorConfig(unary, new PreValueApplicator())
);
export function Unary(): LodashMethodDecorator {
  return decorator();
}
export { Unary as unary };
export default decorator;
