import { rest } from 'lodash';

import { DecoratorConfig, DecoratorFactory, LodashMethodDecorator } from './factory';
import { PreValueApplicator } from './applicators';

export const RestDecoratorConfig = new DecoratorConfig(rest, PreValueApplicator);
export const Rest: (start?: number) => LodashMethodDecorator = DecoratorFactory.createDecorator(RestDecoratorConfig);