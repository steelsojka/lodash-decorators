import throttle = require('lodash/throttle');

import { DecoratorConfig, DecoratorFactory, LodashMethodDecorator } from './factory';
import { PreValueApplicator } from './applicators';
import { ThrottleOptions } from './shared';

const decorator = DecoratorFactory.createInstanceDecorator(
  new DecoratorConfig(throttle, new PreValueApplicator(), { setter: true, getter: true })
);

const decoratorGetter = DecoratorFactory.createInstanceDecorator(
  new DecoratorConfig(throttle, new PreValueApplicator(), { getter: true })
);

const decoratorSetter = DecoratorFactory.createInstanceDecorator(
  new DecoratorConfig(throttle, new PreValueApplicator(), { setter: true })
);

export function Throttle(wait?: number, options?: ThrottleOptions): LodashMethodDecorator {
  return decorator(wait, options);
}

export function ThrottleGetter(wait?: number, options?: ThrottleOptions): LodashMethodDecorator {
  return decoratorGetter(wait, options);
}

export function ThrottleSetter(wait?: number, options?: ThrottleOptions): LodashMethodDecorator {
  return decoratorSetter(wait, options);
}

export { Throttle as throttle };
export { ThrottleGetter as throttleGetter };
export { ThrottleSetter as throttleSetter };
export default decorator;
