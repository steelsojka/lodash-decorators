import { negate } from 'lodash';

import { DecoratorConfig, DecoratorFactory } from './factory';
import { PreValueApplicator } from './applicators';

export const NegateDecoratorConfig = new DecoratorConfig(negate, PreValueApplicator);
export const Negate = DecoratorFactory.createDecorator(NegateDecoratorConfig)();