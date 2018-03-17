import spread = require('lodash/spread');

import { DecoratorConfig, DecoratorFactory, BiTypedMethodDecorator1 } from './factory';
import { PreValueApplicator } from './applicators';

export const Spread = DecoratorFactory.createDecorator(
  new DecoratorConfig(spread, new PreValueApplicator(), { optionalParams: true })
) as BiTypedMethodDecorator1<number>;
export { Spread as spread };
export default Spread;
