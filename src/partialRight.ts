import { partialRight } from 'lodash';

import { DecoratorConfig, DecoratorFactory, LodashDecorator } from './factory';
import { PartialApplicator } from './applicators';

export const PartialRightDecoratorConfig = new DecoratorConfig(partialRight, PartialApplicator);
export const PartialRight: (...partials: any[]) => LodashDecorator = DecoratorFactory.createDecorator(PartialRightDecoratorConfig);