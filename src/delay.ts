import { delay } from 'lodash';

import { DecoratorConfig, DecoratorFactory, LodashDecorator } from './factory';
import { PartialedApplicator } from './applicators';

export const DelayDecoratorConfig = new DecoratorConfig(delay, PartialedApplicator);
export const Delay: (wait: number, ...args: any[]) => LodashDecorator = DecoratorFactory.createDecorator(DelayDecoratorConfig);