import spread = require('lodash/spread');

import { DecoratorConfig, DecoratorFactory, LodashMethodDecorator } from './factory';
import { PreValueApplicator } from './applicators';

export const Spread: (start?: number) => LodashMethodDecorator = DecoratorFactory.createDecorator(
  new DecoratorConfig(spread, new PreValueApplicator())
);
export { Spread as spread };
export default Spread;
