import { partial } from 'lodash';

import { DecoratorConfig, DecoratorFactory, LodashMethodDecorator } from './factory';
import { PartialApplicator } from './applicators';

export const PartialDecoratorConfig = new DecoratorConfig(partial, PartialApplicator);
export const Partial: (...partials: any[]) => LodashMethodDecorator = DecoratorFactory.createDecorator(PartialDecoratorConfig);