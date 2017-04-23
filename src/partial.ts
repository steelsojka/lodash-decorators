import { partial } from 'lodash';

import { DecoratorConfig, DecoratorFactory, LodashDecorator } from './factory';
import { PartialApplicator } from './applicators';

export const PartialDecoratorConfig = new DecoratorConfig(partial, PartialApplicator);
export const Partial: (...partials: any[]) => LodashDecorator = DecoratorFactory.createDecorator(PartialDecoratorConfig);