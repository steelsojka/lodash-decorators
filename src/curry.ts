import { curry } from 'lodash';

import { DecoratorConfig, DecoratorFactory, LodashMethodDecorator } from './factory';
import { PreValueApplicator } from './applicators';

export const CurryDecoratorConfig = new DecoratorConfig(curry, PreValueApplicator);
export const Curry: (arity?: number) => LodashMethodDecorator = DecoratorFactory.createDecorator(CurryDecoratorConfig);