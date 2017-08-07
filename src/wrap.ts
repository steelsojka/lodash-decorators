import wrap = require('lodash/wrap');

import {
  DecoratorConfig,
  DecoratorFactory,
  ResolvableFunction,
  LodashMethodDecorator
} from './factory/index';
import { WrapApplicator } from './applicators/index';

const decorator = DecoratorFactory.createDecorator(
  new DecoratorConfig(wrap, new WrapApplicator())
);
export function Wrap(fnToWrap?: ResolvableFunction): LodashMethodDecorator {
  return decorator(fnToWrap);
}
export { Wrap as wrap };
export default decorator;
