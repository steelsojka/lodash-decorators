import { memoize } from 'lodash';

import { DecoratorConfig, DecoratorFactory } from './factory';
import { PreValueApplicator } from './applicators';

export const MemoizeDecoratorConfig = new DecoratorConfig(memoize, PreValueApplicator);
export const Memoize = DecoratorFactory.createInstanceDecorator(MemoizeDecoratorConfig);