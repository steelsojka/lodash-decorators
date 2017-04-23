import { before } from 'lodash';

import { DecoratorConfig, DecoratorFactory } from './factory';
import { PostValueApplicator } from './applicators';

export const BeforeDecoratorConfig = new DecoratorConfig(before, PostValueApplicator);
export const Before = DecoratorFactory.createInstanceDecorator(BeforeDecoratorConfig);