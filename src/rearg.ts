import { rearg } from 'lodash';

import { DecoratorConfig, DecoratorFactory, LodashMethodDecorator } from './factory';
import { PreValueApplicator } from './applicators';

export const ReargDecoratorConfig = new DecoratorConfig(rearg, PreValueApplicator);
export const Rearg: (indexes: number|number[], ...args: number[]) => LodashMethodDecorator = DecoratorFactory.createDecorator(ReargDecoratorConfig);