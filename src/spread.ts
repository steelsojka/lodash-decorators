import { spread } from 'lodash';

import { DecoratorConfig, DecoratorFactory } from './factory';
import { PreValueApplicator } from './applicators';

export const SpreadDecoratorConfig = new DecoratorConfig(spread, PreValueApplicator);
export const Spread = DecoratorFactory.createDecorator(SpreadDecoratorConfig)();