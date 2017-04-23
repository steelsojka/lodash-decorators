import { ary } from 'lodash';

import { DecoratorConfig, DecoratorFactory, LodashDecorator } from './factory';
import { PreValueApplicator } from './applicators';

export const AryDecoratorConfig = new DecoratorConfig(ary, PreValueApplicator);
export const Ary: (n: number) => LodashDecorator = DecoratorFactory.createDecorator(AryDecoratorConfig);