import { after } from 'lodash';

import { DecoratorConfig, DecoratorFactory, LodashDecorator } from './factory';
import { PostValueApplicator } from './applicators';

export const AfterDecoratorConfig = new DecoratorConfig(after, PostValueApplicator);
export const After: (n: number) => LodashDecorator = DecoratorFactory.createInstanceDecorator(AfterDecoratorConfig);