import { partial } from 'lodash';

import { DecoratorConfig, DecoratorFactory } from './factory';
import { PartialApplicator } from './applicators';

const decorator = DecoratorFactory.createInstanceDecorator(
  new DecoratorConfig(partial, new PartialApplicator(), { property: true, method: false })
);

export function Partial(...partials: any[]): PropertyDecorator {
  return decorator(...partials);
}
export { Partial as partial };
export default decorator;
