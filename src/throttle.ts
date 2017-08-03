import throttle = require('lodash/throttle');

import { DecoratorConfig, DecoratorFactory, LodashMethodDecorator } from './factory';
import { PreValueApplicator } from './applicators';
import { ThrottleOptions } from './shared';

export function Throttle(wait?: number, options?: ThrottleOptions): LodashMethodDecorator {
  return DecoratorFactory.createInstanceDecorator(
    new DecoratorConfig(throttle, new PreValueApplicator(), { setter: true, getter: true })
  );
}

export function ThrottleGetter(wait?: number, options?: ThrottleOptions): LodashMethodDecorator {
  return DecoratorFactory.createInstanceDecorator(
    new DecoratorConfig(throttle, new PreValueApplicator(), { getter: true })
  );
}

export function ThrottleSetter(wait?: number, options?: ThrottleOptions): LodashMethodDecorator {
  return DecoratorFactory.createInstanceDecorator(
    new DecoratorConfig(throttle, new PreValueApplicator(), { setter: true })
  );
}

export { Throttle as throttle };
export { ThrottleGetter as throttleGetter };
export { ThrottleSetter as throttleSetter };
export default Throttle;
