import { flow } from 'lodash';

import {
  DecoratorConfig, 
  DecoratorFactory,
  ResolvableFunction,
  LodashMethodDecorator
} from './factory';
import { ComposeApplicator } from './applicators';

export const FlowDecoratorConfig = new DecoratorConfig(flow, ComposeApplicator);
export const Flow: (...fns: ResolvableFunction[]) => LodashMethodDecorator = DecoratorFactory.createDecorator(FlowDecoratorConfig);