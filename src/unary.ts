import { unary } from 'lodash';

import { DecoratorConfig, DecoratorFactory } from './factory';
import { PreValueApplicator } from './applicators';

export const UnaryDecoratorConfig = new DecoratorConfig(unary, PreValueApplicator);
export const Unary = DecoratorFactory.createDecorator(UnaryDecoratorConfig)();