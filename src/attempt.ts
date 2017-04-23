import { attempt, partial } from 'lodash';

import { DecoratorConfig, DecoratorFactory } from './factory';
import { PostValueApplicator } from './applicators';

const _attempt = (fn: Function) => partial(attempt, fn);

export const AttemptDecoratorConfig = new DecoratorConfig(_attempt, PostValueApplicator);
export const Attempt = DecoratorFactory.createInstanceDecorator(AttemptDecoratorConfig)();
