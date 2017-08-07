import rearg = require('lodash/rearg');

import {
  DecoratorConfig,
  DecoratorFactory,
  LodashDecorator,
  ResolvableFunction
} from './factory/index';
import { PartialValueApplicator } from './applicators/index';

const decorator = DecoratorFactory.createInstanceDecorator(
  new DecoratorConfig(rearg, new PartialValueApplicator(), { property: true })
);

export function Rearg(indexes: ResolvableFunction | number | number[], ...args: Array<number | number[]>): LodashDecorator {
  return decorator(indexes, ...args);
}
export { Rearg as rearg };
export default decorator;
