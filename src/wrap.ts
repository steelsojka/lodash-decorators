import wrap = require('lodash/wrap');

import {
  DecoratorConfig,
  DecoratorFactory,
  ResolvableFunction,
  LodashMethodDecorator
} from './factory';
import { WrapApplicator } from './applicators';

export function Wrap(fnToWrap?: ResolvableFunction): LodashMethodDecorator {
  return DecoratorFactory.createDecorator(
    new DecoratorConfig(wrap, new WrapApplicator())
  )(fnToWrap);
}
export { Wrap as wrap };
export default Wrap;
