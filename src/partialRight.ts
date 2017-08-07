import partialRight = require('lodash/partialRight');

import { DecoratorConfig, DecoratorFactory } from './factory/index';
import { PartialApplicator } from './applicators/index';

const decorator = DecoratorFactory.createInstanceDecorator(
  new DecoratorConfig(partialRight, new PartialApplicator(), { property: true, method: false })
);
export function PartialRight(...partials: any[]): PropertyDecorator {
  return decorator(...partials);
}
export { PartialRight as partialRight };
export default decorator;
