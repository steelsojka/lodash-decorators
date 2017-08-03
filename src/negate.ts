import negate = require('lodash/negate');

import {
  DecoratorConfig,
  DecoratorFactory,
  LodashDecorator,
  ResolvableFunction
} from './factory';
import { PartialValueApplicator } from './applicators';

export function Negate(fn?: ResolvableFunction): LodashDecorator {
  return DecoratorFactory.createInstanceDecorator(
    new DecoratorConfig(negate, new PartialValueApplicator(), { property: true })
  );
}
export { Negate as negate };
export default Negate;
