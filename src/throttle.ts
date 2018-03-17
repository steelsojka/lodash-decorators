import throttle = require('lodash/throttle');

import { DecoratorConfig, DecoratorFactory, BiTypedDecorator2 } from './factory';
import { PreValueApplicator } from './applicators';
import { ThrottleOptions } from './shared';

export const Throttle = DecoratorFactory.createInstanceDecorator(
  new DecoratorConfig(throttle, new PreValueApplicator(), { setter: true, getter: true, optionalParams: true })
) as BiTypedDecorator2<number, ThrottleOptions>;

export const ThrottleGetter = DecoratorFactory.createInstanceDecorator(
  new DecoratorConfig(throttle, new PreValueApplicator(), { getter: true, optionalParams: true })
) as BiTypedDecorator2<number, ThrottleOptions>;

export const ThrottleSetter = DecoratorFactory.createInstanceDecorator(
  new DecoratorConfig(throttle, new PreValueApplicator(), { setter: true, optionalParams: true })
) as BiTypedDecorator2<number, ThrottleOptions>;

export { Throttle as throttle };
export { ThrottleGetter as throttleGetter };
export { ThrottleSetter as throttleSetter };
export default Throttle;
