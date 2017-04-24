import { throttle } from 'lodash';

import { DecoratorConfig, DecoratorFactory, LodashMethodDecorator } from './factory';
import { PreValueApplicator } from './applicators';
import { ThrottleOptions } from './shared';

export const Throttle: (wait?: number, options?: ThrottleOptions) => LodashMethodDecorator = DecoratorFactory.createInstanceDecorator(
  new DecoratorConfig(throttle, PreValueApplicator, { setter: true })
);
export { Throttle as throttle };
export default Throttle;