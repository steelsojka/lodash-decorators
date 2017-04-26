import { flow } from 'lodash';

import {
  DecoratorConfig, 
  DecoratorFactory,
  ResolvableFunction,
  LodashDecorator
} from './factory';
import { ComposeApplicator } from './applicators';

export const Flow: (...fns: ResolvableFunction[]) => LodashDecorator = DecoratorFactory.createInstanceDecorator(
  new DecoratorConfig(flow, new ComposeApplicator({ post: true }), { property: true })
);
export { Flow as flow };
export default Flow;