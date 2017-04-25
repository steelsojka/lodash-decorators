import { unary } from 'lodash';

import { DecoratorConfig, DecoratorFactory, LodashMethodDecorator } from './factory';
import { PreValueApplicator } from './applicators';

export const Unary: () => LodashMethodDecorator = DecoratorFactory.createDecorator(
  new DecoratorConfig(unary, PreValueApplicator)
);
export { Unary as unary };
export default Unary;