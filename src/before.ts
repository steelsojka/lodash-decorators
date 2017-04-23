import { before } from 'lodash';

import { DecoratorConfig, DecoratorFactory, LodashDecorator } from './factory';
import { PostValueApplicator } from './applicators';

export const BeforeDecoratorConfig = new DecoratorConfig(before, PostValueApplicator);
export const Before: (n: number) => LodashDecorator = DecoratorFactory.createInstanceDecorator(BeforeDecoratorConfig);