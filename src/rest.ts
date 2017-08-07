import rest = require('lodash/rest');

import { DecoratorConfig, DecoratorFactory, LodashMethodDecorator } from './factory';
import { PreValueApplicator } from './applicators';

const decorator = DecoratorFactory.createDecorator(
  new DecoratorConfig(rest, new PreValueApplicator())
);

export function Rest(start?: number): LodashMethodDecorator {
  return decorator(start);
}
export { Rest as rest };
export default decorator;
