import unary from 'lodash/unary';

import { DecoratorConfig, DecoratorFactory, BiTypedMethodDecorator } from './factory';
import { PreValueApplicator } from './applicators';

export const Unary = DecoratorFactory.createDecorator(
  new DecoratorConfig(unary, new PreValueApplicator(), { optionalParams: true })
) as BiTypedMethodDecorator;
export { Unary as unary };
export default Unary;
