import spread = require('lodash/spread');

import { DecoratorConfig, DecoratorFactory, LegacyBiTypedMethodDecorator1 } from './factory';
import { PreValueApplicator } from './applicators';

export const Spread = DecoratorFactory.createDecorator(
  new DecoratorConfig(spread, new PreValueApplicator(), { optionalParams: true })
) as LegacyBiTypedMethodDecorator1<number>;
export { Spread as spread };
export default Spread;
