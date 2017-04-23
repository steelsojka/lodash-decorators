import { throttle } from 'lodash';

import { DecoratorConfig, DecoratorFactory } from './factory';
import { PreValueApplicator } from './applicators';

export const ThrottleDecoratorConfig = new DecoratorConfig(throttle, PreValueApplicator);
export const Throttle = DecoratorFactory.createInstanceDecorator(ThrottleDecoratorConfig);