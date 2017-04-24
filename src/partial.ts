import { partial } from 'lodash';

import { DecoratorConfig, DecoratorFactory, LodashMethodDecorator } from './factory';
import { PartialApplicator } from './applicators';

export const Partial: (...partials: any[]) => LodashMethodDecorator = DecoratorFactory.createDecorator(new DecoratorConfig(partial, PartialApplicator));