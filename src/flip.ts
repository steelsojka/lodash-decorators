import { flip } from 'lodash';

import { DecoratorConfig, DecoratorFactory } from './factory';
import { PreValueApplicator } from './applicators';

export const FlipDecoratorConfig = new DecoratorConfig(flip, PreValueApplicator);
export const Flip = DecoratorFactory.createDecorator(FlipDecoratorConfig)();