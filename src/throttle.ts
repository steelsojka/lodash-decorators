import { throttle } from 'lodash';

import { DecoratorConfig, DecoratorFactory, LodashDecorator } from './factory';
import { PreValueApplicator } from './applicators';

export interface ThrottleOptions {
  leading?: boolean;
  trailing?: boolean;
}

export const ThrottleDecoratorConfig = new DecoratorConfig(throttle, PreValueApplicator);
export const Throttle: (wait?: number, options?: ThrottleOptions) => LodashDecorator = DecoratorFactory.createInstanceDecorator(ThrottleDecoratorConfig);