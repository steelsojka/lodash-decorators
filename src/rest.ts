import rest = require('lodash/rest');

import { DecoratorConfig, DecoratorFactory, BiTypedMethodDecorator1 } from './factory';
import { PreValueApplicator } from './applicators';

export const Rest = DecoratorFactory.createDecorator(
  new DecoratorConfig(rest, new PreValueApplicator(), { optionalParams: true })
) as BiTypedMethodDecorator1<number>;
export { Rest as rest };
export default Rest;
