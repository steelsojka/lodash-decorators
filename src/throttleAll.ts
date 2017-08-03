import throttle = require('lodash/throttle');

import { DecoratorConfig, DecoratorFactory, LodashMethodDecorator } from './factory';
import { PreValueApplicator } from './applicators';
import { ThrottleOptions } from './shared';

export function ThrottleAll(wait?: number, options?: ThrottleOptions): LodashMethodDecorator {
  return DecoratorFactory.createDecorator(
    new DecoratorConfig(throttle, new PreValueApplicator(), { setter: true })
  )(wait, options);
}
export { ThrottleAll as throttleAll };
export default ThrottleAll;
