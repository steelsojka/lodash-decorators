import { after } from 'lodash';

import { DecoratorConfig, DecoratorFactory } from './factory';
import { PostValueApplicator } from './applicators';

export const AfterDecoratorConfig = new DecoratorConfig(after, PostValueApplicator);
export const After = DecoratorFactory.createInstanceDecorator(AfterDecoratorConfig);