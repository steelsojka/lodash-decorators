import { rest } from 'lodash';

import { DecoratorConfig, DecoratorFactory, LodashDecorator } from './factory';
import { PreValueApplicator } from './applicators';

export const RestDecoratorConfig = new DecoratorConfig(rest, PreValueApplicator);
export const Rest: (start?: number) => LodashDecorator = DecoratorFactory.createDecorator(RestDecoratorConfig);