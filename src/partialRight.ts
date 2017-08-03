import partialRight = require('lodash/partialRight');

import { DecoratorConfig, DecoratorFactory } from './factory';
import { PartialApplicator } from './applicators';

export function PartialRight(...partials: any[]): PropertyDecorator {
  return DecoratorFactory.createInstanceDecorator(
    new DecoratorConfig(partialRight, new PartialApplicator(), { property: true, method: false })
  )(...partials);
}
export { PartialRight as partialRight };
export default PartialRight;
