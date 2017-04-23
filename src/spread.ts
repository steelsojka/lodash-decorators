import { spread } from 'lodash';

import { DecoratorConfig, DecoratorFactory, LodashDecorator } from './factory';
import { PreValueApplicator } from './applicators';

export const SpreadDecoratorConfig = new DecoratorConfig(spread, PreValueApplicator);
export const Spread: (start?: number) => LodashDecorator = DecoratorFactory.createDecorator(SpreadDecoratorConfig);