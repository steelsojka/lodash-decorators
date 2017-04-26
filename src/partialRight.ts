import { partialRight } from 'lodash';

import { DecoratorConfig, DecoratorFactory } from './factory';
import { PartialApplicator } from './applicators';

export const PartialRight: (...partials: any[]) => PropertyDecorator = DecoratorFactory.createInstanceDecorator(
  new DecoratorConfig(partialRight, new PartialApplicator(), { property: true, method: false })
);
export { PartialRight as partialRight };
export default PartialRight;