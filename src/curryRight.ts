import { curryRight } from 'lodash';

import { DecoratorConfig, DecoratorFactory, LodashDecorator } from './factory';
import { PreValueApplicator } from './applicators';

export const CurryRightDecoratorConfig = new DecoratorConfig(curryRight, PreValueApplicator);
export const CurryRight: (arity?: number) => LodashDecorator = DecoratorFactory.createDecorator(CurryRightDecoratorConfig);