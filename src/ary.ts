import { ary } from 'lodash';

import { DecoratorConfig, DecoratorFactory } from './factory';
import { PreValueApplicator } from './applicators';

export const AryDecoratorConfig = new DecoratorConfig(ary, PreValueApplicator);
export const Ary = DecoratorFactory.createDecorator(AryDecoratorConfig);