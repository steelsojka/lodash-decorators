import { DecoratorFactory, BiTypedDecorator2 } from './factory';
import { ThrottleOptions } from './shared';
import {
  throttleConfig,
  throttleGetterConfig,
  throttleSetterConfig
} from '../configs/throttle';

export const Throttle = DecoratorFactory.legacy.createInstanceDecorator(
  throttleConfig
) as BiTypedDecorator2<number, ThrottleOptions>;

export const ThrottleGetter = DecoratorFactory.legacy.createInstanceDecorator(
  throttleGetterConfig
) as BiTypedDecorator2<number, ThrottleOptions>;

export const ThrottleSetter = DecoratorFactory.legacy.createInstanceDecorator(
  throttleSetterConfig
) as BiTypedDecorator2<number, ThrottleOptions>;

export { Throttle as throttle };
export { ThrottleGetter as throttleGetter };
export { ThrottleSetter as throttleSetter };
export default Throttle;
