import throttle = require('lodash/throttle');

import {
  DecoratorConfig,
  DecoratorFactory,
  BiTypedDecorator2
} from './factory';
import { PreValueApplicator } from './applicators';
import { ThrottleOptions } from '../shared';

export const Throttle = DecoratorFactory.legacy.createInstanceDecorator(
  new DecoratorConfig(throttle, new PreValueApplicator(), {
    getter: true,
    optionalParams: true,
    setter: true
  })
) as BiTypedDecorator2<number, ThrottleOptions>;

export const ThrottleGetter = DecoratorFactory.legacy.createInstanceDecorator(
  new DecoratorConfig(throttle, new PreValueApplicator(), {
    getter: true,
    optionalParams: true
  })
) as BiTypedDecorator2<number, ThrottleOptions>;

export const ThrottleSetter = DecoratorFactory.legacy.createInstanceDecorator(
  new DecoratorConfig(throttle, new PreValueApplicator(), {
    optionalParams: true,
    setter: true
  })
) as BiTypedDecorator2<number, ThrottleOptions>;

export { Throttle as throttle };
export { ThrottleGetter as throttleGetter };
export { ThrottleSetter as throttleSetter };
export default Throttle;
