import { spread } from 'lodash';

import { DecoratorConfig, DecoratorFactory, LodashMethodDecorator } from './factory';
import { PreValueApplicator } from './applicators';

export const SpreadDecoratorConfig = new DecoratorConfig(spread, PreValueApplicator);
export const Spread: (start?: number) => LodashMethodDecorator = DecoratorFactory.createDecorator(SpreadDecoratorConfig);