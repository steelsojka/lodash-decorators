import { defer } from 'lodash';

import { DecoratorConfig, DecoratorFactory, LodashMethodDecorator } from './factory';
import { PartialedApplicator } from './applicators';

export const DeferDecoratorConfig = new DecoratorConfig(defer, PartialedApplicator);
export const Defer: (...args: any[]) => LodashMethodDecorator = DecoratorFactory.createDecorator(DeferDecoratorConfig);