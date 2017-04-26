import { flowRight } from 'lodash';

import {
  DecoratorConfig,
  DecoratorFactory,
  LodashDecorator,
  ResolvableFunction
} from './factory';
import { ComposeApplicator } from './applicators';

export const FlowRight: (...fns: ResolvableFunction[]) => LodashDecorator = DecoratorFactory.createInstanceDecorator(
  new DecoratorConfig(flowRight, new ComposeApplicator({ post: false }), { property: true })
);
export { FlowRight as flowRight };
export default FlowRight;