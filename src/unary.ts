import unary = require('lodash/unary');

import { DecoratorConfig, DecoratorFactory, LegacyBiTypedMethodDecorator } from './factory';
import { PreValueApplicator } from './applicators';

export const Unary = DecoratorFactory.createDecorator(
  new DecoratorConfig(unary, new PreValueApplicator(), { optionalParams: true })
) as LegacyBiTypedMethodDecorator;
export { Unary as unary };
export default Unary;
