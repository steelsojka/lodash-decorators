import { flow } from 'lodash';

import {
  DecoratorConfig, 
  DecoratorFactory,
  ResolvableFunction,
  LodashDecorator
} from './factory';
import { ComposeApplicator } from './applicators';

export const FlowDecoratorConfig = new DecoratorConfig(flow, ComposeApplicator);
export const Flow: (...fns: ResolvableFunction[]) => LodashDecorator = DecoratorFactory.createDecorator(FlowDecoratorConfig);