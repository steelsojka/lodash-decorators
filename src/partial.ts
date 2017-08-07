import partial = require('lodash/partial');

import { DecoratorConfig, DecoratorFactory } from './factory/index';
import { PartialApplicator } from './applicators/index';

const decorator = DecoratorFactory.createInstanceDecorator(
  new DecoratorConfig(partial, new PartialApplicator(), { property: true, method: false })
);
export function Partial(...partials: any[]): PropertyDecorator {
  return decorator(...partials);
}
export { Partial as partial };
export default decorator;
