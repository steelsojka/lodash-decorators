import { delay } from 'lodash';

import { DecoratorConfig, DecoratorFactory, LodashMethodDecorator } from './factory';
import { PartialedApplicator } from './applicators';

export const DelayDecoratorConfig = new DecoratorConfig(delay, PartialedApplicator);
export const Delay: (wait: number, ...args: any[]) => LodashMethodDecorator = DecoratorFactory.createDecorator(DelayDecoratorConfig);