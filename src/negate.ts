import negate = require('lodash/negate');

import {
  DecoratorConfig,
  DecoratorFactory,
  LodashDecorator,
  ResolvableFunction
} from './factory';
import { PartialValueApplicator } from './applicators';

const decorator = DecoratorFactory.createInstanceDecorator(
  new DecoratorConfig(negate, new PartialValueApplicator(), { property: true })
);

export function Negate(fn?: ResolvableFunction): LodashDecorator {
  return decorator(fn);
}
export { Negate as negate };
export default decorator;
