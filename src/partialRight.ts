import { partialRight } from 'lodash';

import { DecoratorConfig, DecoratorFactory, LodashMethodDecorator } from './factory';
import { PartialApplicator } from './applicators';

export const PartialRightDecoratorConfig = new DecoratorConfig(partialRight, PartialApplicator);
export const PartialRight: (...partials: any[]) => LodashMethodDecorator = DecoratorFactory.createDecorator(PartialRightDecoratorConfig);