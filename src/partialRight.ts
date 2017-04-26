import { partialRight } from 'lodash';

import { DecoratorConfig, DecoratorFactory, LodashMethodDecorator } from './factory';
import { PartialApplicator } from './applicators';

export const PartialRight: (...partials: any[]) => LodashMethodDecorator = DecoratorFactory.createDecorator(
  new DecoratorConfig(partialRight, new PartialApplicator())
);
export { PartialRight as partialRight };
export default PartialRight;