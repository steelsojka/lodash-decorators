import { memoize } from 'lodash';

import { DecoratorConfig, DecoratorFactory, LodashMethodDecorator } from './factory';
import { PreValueApplicator } from './applicators';

export const MemoizeDecoratorConfig = new DecoratorConfig(memoize, PreValueApplicator);
export const Memoize: (resolver?: Function) => LodashMethodDecorator = DecoratorFactory.createInstanceDecorator(MemoizeDecoratorConfig);