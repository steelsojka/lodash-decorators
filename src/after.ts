import { after } from 'lodash';

import { DecoratorConfig, DecoratorFactory, LodashMethodDecorator } from './factory';
import { PostValueApplicator } from './applicators';

export const AfterDecoratorConfig = new DecoratorConfig(after, PostValueApplicator);
export const After: (n: number) => LodashMethodDecorator = DecoratorFactory.createInstanceDecorator(AfterDecoratorConfig);