import throttle = require('lodash/throttle');

import { DecoratorConfig, DecoratorFactory, LodashMethodDecorator } from './factory';
import { PreValueApplicator } from './applicators';
import { ThrottleOptions } from './shared';

const decorator = DecoratorFactory.createDecorator(
  new DecoratorConfig(throttle, new PreValueApplicator(), { setter: true })
);
export function ThrottleAll(wait?: number, options?: ThrottleOptions): LodashMethodDecorator {
  return decorator(wait, options);
}
export { ThrottleAll as throttleAll };
export default decorator;
