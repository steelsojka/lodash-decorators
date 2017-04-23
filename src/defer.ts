import { defer } from 'lodash';

import { DecoratorConfig, DecoratorFactory, LodashDecorator } from './factory';
import { PartialedApplicator } from './applicators';

export const DeferDecoratorConfig = new DecoratorConfig(defer, PartialedApplicator);
export const Defer: (...args: any[]) => LodashDecorator = DecoratorFactory.createDecorator(DeferDecoratorConfig);