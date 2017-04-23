import { curry } from 'lodash';

import { DecoratorConfig, DecoratorFactory, LodashDecorator } from './factory';
import { PreValueApplicator } from './applicators';

export const CurryDecoratorConfig = new DecoratorConfig(curry, PreValueApplicator);
export const Curry: (arity?: number) => LodashDecorator = DecoratorFactory.createDecorator(CurryDecoratorConfig);