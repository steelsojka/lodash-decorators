import { flowRight } from 'lodash';

import {
  DecoratorConfig,
  DecoratorFactory,
  LodashDecorator,
  ResolvableFunction
} from './factory';
import { ComposeApplicator } from './applicators';

export const FlowRightDecoratorConfig = new DecoratorConfig(flowRight, ComposeApplicator);
export const FlowRight: (...fns: ResolvableFunction[]) => LodashDecorator = DecoratorFactory.createDecorator(FlowRightDecoratorConfig);