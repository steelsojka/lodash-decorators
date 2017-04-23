import { throttle } from 'lodash';

import { DecoratorConfig, DecoratorFactory, LodashMethodDecorator } from './factory';
import { PreValueApplicator } from './applicators';

export interface ThrottleOptions {
  leading?: boolean;
  trailing?: boolean;
}

export const ThrottleDecoratorConfig = new DecoratorConfig(throttle, PreValueApplicator);
export const Throttle: (wait?: number, options?: ThrottleOptions) => LodashMethodDecorator = DecoratorFactory.createInstanceDecorator(ThrottleDecoratorConfig);