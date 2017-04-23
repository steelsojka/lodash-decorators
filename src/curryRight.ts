import { curryRight } from 'lodash';

import { DecoratorConfig, DecoratorFactory, LodashMethodDecorator } from './factory';
import { PreValueApplicator } from './applicators';

export const CurryRightDecoratorConfig = new DecoratorConfig(curryRight, PreValueApplicator);
export const CurryRight: (arity?: number) => LodashMethodDecorator = DecoratorFactory.createDecorator(CurryRightDecoratorConfig);