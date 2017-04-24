import { flowRight } from 'lodash';

import {
  DecoratorConfig,
  DecoratorFactory,
  LodashMethodDecorator,
  ResolvableFunction
} from './factory';
import { ComposeApplicator } from './applicators';

export const FlowRight: (...fns: ResolvableFunction[]) => LodashMethodDecorator = DecoratorFactory.createDecorator(new DecoratorConfig(flowRight, ComposeApplicator));
export { FlowRight as flowRight };
export default FlowRight;