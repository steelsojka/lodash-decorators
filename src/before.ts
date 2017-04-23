import { before } from 'lodash';

import { DecoratorConfig, DecoratorFactory, LodashMethodDecorator } from './factory';
import { PostValueApplicator } from './applicators';

export const BeforeDecoratorConfig = new DecoratorConfig(before, PostValueApplicator);
export const Before: (n: number) => LodashMethodDecorator = DecoratorFactory.createInstanceDecorator(BeforeDecoratorConfig);