import partial = require('lodash/partial');

import { DecoratorConfig, DecoratorFactory } from './factory';
import { PartialApplicator } from './applicators';

export function Partial(...partials: any[]): PropertyDecorator {
  return DecoratorFactory.createInstanceDecorator(
    new DecoratorConfig(partial, new PartialApplicator(), { property: true, method: false })
  );
}
export { Partial as partial };
export default Partial;
