import throttle = require('lodash/throttle');

import { DecoratorConfig, DecoratorFactory, LodashMethodDecorator } from './factory';
import { PreValueApplicator } from './applicators';
import { ThrottleOptions } from './shared';

export const Throttle: (wait?: number, options?: ThrottleOptions) => LodashMethodDecorator = DecoratorFactory.createInstanceDecorator(
  new DecoratorConfig(throttle, new PreValueApplicator(), { setter: true, getter: true })
);

export const ThrottleGetter: (wait?: number, options?: ThrottleOptions) => LodashMethodDecorator = DecoratorFactory.createInstanceDecorator(
  new DecoratorConfig(throttle, new PreValueApplicator(), { getter: true })
);

export const ThrottleSetter: (wait?: number, options?: ThrottleOptions) => LodashMethodDecorator = DecoratorFactory.createInstanceDecorator(
  new DecoratorConfig(throttle, new PreValueApplicator(), { setter: true })
);

export { Throttle as throttle };
export { ThrottleGetter as throttleGetter };
export { ThrottleSetter as throttleSetter };
export default Throttle;
