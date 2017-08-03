import spread = require('lodash/spread');

import { DecoratorConfig, DecoratorFactory, LodashMethodDecorator } from './factory';
import { PreValueApplicator } from './applicators';

export function Spread(start?: number): LodashMethodDecorator {
  return DecoratorFactory.createDecorator(
    new DecoratorConfig(spread, new PreValueApplicator())
  );
}
export { Spread as spread };
export default Spread;
