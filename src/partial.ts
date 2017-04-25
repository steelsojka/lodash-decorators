import { partial } from 'lodash';

import { DecoratorConfig, DecoratorFactory, LodashMethodDecorator } from './factory';
import { PartialApplicator } from './applicators';

export const Partial: (...partials: any[]) => LodashMethodDecorator = DecoratorFactory.createInstanceDecorator(
  new DecoratorConfig(partial, PartialApplicator)
);
export { Partial as partial };
export default Partial;