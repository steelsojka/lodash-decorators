import { curryRight } from 'lodash';

import { DecoratorConfig, DecoratorFactory, LodashMethodDecorator } from './factory';
import { PreValueApplicator } from './applicators';

export const CurryRightAll: (arity?: number) => LodashMethodDecorator = DecoratorFactory.createDecorator(new DecoratorConfig(curryRight, PreValueApplicator));