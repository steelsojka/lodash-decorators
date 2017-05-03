import wrap = require('lodash/wrap');

import {
  DecoratorConfig,
  DecoratorFactory,
  ResolvableFunction,
  LodashMethodDecorator
} from './factory';
import { WrapApplicator } from './applicators';

export const Wrap: (fnToWrap?: ResolvableFunction) => LodashMethodDecorator = DecoratorFactory.createDecorator(
  new DecoratorConfig(wrap, new WrapApplicator())
);
export { Wrap as wrap };
export default Wrap;
