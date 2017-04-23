import { memoize } from 'lodash';

import { DecoratorConfig, DecoratorFactory, LodashDecorator } from './factory';
import { PreValueApplicator } from './applicators';

export const MemoizeDecoratorConfig = new DecoratorConfig(memoize, PreValueApplicator);
export const Memoize: (resolver?: Function) => LodashDecorator = DecoratorFactory.createInstanceDecorator(MemoizeDecoratorConfig);