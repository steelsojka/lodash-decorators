import throttle = require('lodash/throttle');

import { DecoratorConfig, DecoratorFactory, LodashMethodDecorator } from './factory/index';
import { PreValueApplicator } from './applicators/index';
import { ThrottleOptions } from './shared';

const decorator = DecoratorFactory.createInstanceDecorator(
  new DecoratorConfig(throttle, new PreValueApplicator(), { setter: true, getter: true })
);
export function Throttle(wait?: number, options?: ThrottleOptions): LodashMethodDecorator {
  return decorator(wait, options);
}

const decoratorGetter = DecoratorFactory.createInstanceDecorator(
  new DecoratorConfig(throttle, new PreValueApplicator(), { getter: true })
);
export function ThrottleGetter(wait?: number, options?: ThrottleOptions): LodashMethodDecorator {
  return decoratorGetter(wait, options);
}

const decoratorSetter = DecoratorFactory.createInstanceDecorator(
  new DecoratorConfig(throttle, new PreValueApplicator(), { setter: true })
);
export function ThrottleSetter(wait?: number, options?: ThrottleOptions): LodashMethodDecorator {
  return decoratorSetter(wait, options);
}

export { Throttle as throttle };
export { ThrottleGetter as throttleGetter };
export { ThrottleSetter as throttleSetter };
export default decorator;
