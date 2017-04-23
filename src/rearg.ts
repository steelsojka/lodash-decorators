import { rearg } from 'lodash';

import { DecoratorConfig, DecoratorFactory, LodashDecorator } from './factory';
import { PreValueApplicator } from './applicators';

export const ReargDecoratorConfig = new DecoratorConfig(rearg, PreValueApplicator);
export const Rearg: (indexes: number|number[], ...args: number[]) => LodashDecorator = DecoratorFactory.createDecorator(ReargDecoratorConfig);