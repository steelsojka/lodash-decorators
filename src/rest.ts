import rest = require('lodash/rest');

import { DecoratorConfig, DecoratorFactory, LodashMethodDecorator } from './factory/index';
import { PreValueApplicator } from './applicators/index';

const decorator = DecoratorFactory.createDecorator(
  new DecoratorConfig(rest, new PreValueApplicator())
);
export function Rest(start?: number): LodashMethodDecorator {
  return decorator(start);
}
export { Rest as rest };
export default decorator;
