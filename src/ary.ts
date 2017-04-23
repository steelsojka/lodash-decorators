import { ary } from 'lodash';

import { DecoratorConfig, DecoratorFactory, LodashMethodDecorator } from './factory';
import { PreValueApplicator } from './applicators';

export const AryDecoratorConfig = new DecoratorConfig(ary, PreValueApplicator);
export const Ary: (n: number) => LodashMethodDecorator = DecoratorFactory.createDecorator(AryDecoratorConfig);