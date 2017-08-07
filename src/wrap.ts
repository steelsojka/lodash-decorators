import wrap = require('lodash/wrap');

import {
  DecoratorConfig,
  DecoratorFactory,
  ResolvableFunction,
  LodashMethodDecorator
} from './factory';
import { WrapApplicator } from './applicators';

const decorator = DecoratorFactory.createDecorator(
  new DecoratorConfig(wrap, new WrapApplicator())
);

export function Wrap(fnToWrap?: ResolvableFunction): LodashMethodDecorator {
  return decorator(fnToWrap);
}
export { Wrap as wrap };
export default decorator;
