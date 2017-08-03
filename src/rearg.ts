import rearg = require('lodash/rearg');

import {
  DecoratorConfig,
  DecoratorFactory,
  LodashDecorator,
  ResolvableFunction
} from './factory';
import { PartialValueApplicator } from './applicators';

export function Rearg(indexes: ResolvableFunction | number | number[], ...args: Array<number | number[]>): LodashDecorator {
  return DecoratorFactory.createInstanceDecorator(
    new DecoratorConfig(rearg, new PartialValueApplicator(), { property: true })
  );
}
export { Rearg as rearg };
export default Rearg;
