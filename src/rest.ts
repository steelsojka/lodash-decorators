import rest = require('lodash/rest');

import { DecoratorConfig, DecoratorFactory, LegacyBiTypedMethodDecorator1 } from './factory';
import { PreValueApplicator } from './applicators';

export const Rest = DecoratorFactory.createDecorator(
  new DecoratorConfig(rest, new PreValueApplicator(), { optionalParams: true })
) as LegacyBiTypedMethodDecorator1<number>;
export { Rest as rest };
export default Rest;
