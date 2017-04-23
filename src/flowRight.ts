import { flowRight } from 'lodash';

import {
  DecoratorConfig,
  DecoratorFactory,
  LodashMethodDecorator,
  ResolvableFunction
} from './factory';
import { ComposeApplicator } from './applicators';

export const FlowRightDecoratorConfig = new DecoratorConfig(flowRight, ComposeApplicator);
export const FlowRight: (...fns: ResolvableFunction[]) => LodashMethodDecorator = DecoratorFactory.createDecorator(FlowRightDecoratorConfig);