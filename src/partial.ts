import { partial } from 'lodash';

import { DecoratorConfig, DecoratorFactory } from './factory';
import { PartialApplicator } from './applicators';

export const Partial: (...partials: any[]) => PropertyDecorator = DecoratorFactory.createInstanceDecorator(
  new DecoratorConfig(partial, PartialApplicator, { property: true, method: false })
);
export { Partial as partial };
export default Partial;