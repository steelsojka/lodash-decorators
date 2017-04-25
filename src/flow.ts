import { flow } from 'lodash';

import {
  DecoratorConfig, 
  DecoratorFactory,
  ResolvableFunction,
  LodashMethodDecorator
} from './factory';
import { ComposeApplicator } from './applicators';

export const Flow: (...fns: ResolvableFunction[]) => LodashMethodDecorator = DecoratorFactory.createDecorator(
  new DecoratorConfig(flow, ComposeApplicator)
);
export { Flow as flow };
export default Flow;