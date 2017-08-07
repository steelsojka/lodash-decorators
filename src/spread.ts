import spread = require('lodash/spread');

import { DecoratorConfig, DecoratorFactory, LodashMethodDecorator } from './factory/index';
import { PreValueApplicator } from './applicators/index';

const decorator = DecoratorFactory.createDecorator(
  new DecoratorConfig(spread, new PreValueApplicator())
);
export function Spread(start?: number): LodashMethodDecorator {
  return decorator(start);
}
export { Spread as spread };
export default decorator;
