import { rearg } from 'lodash';

import { DecoratorConfig, DecoratorFactory } from './factory';
import { PreValueApplicator } from './applicators';

export const ReargDecoratorConfig = new DecoratorConfig(rearg, PreValueApplicator);
export const Rearg = DecoratorFactory.createDecorator(ReargDecoratorConfig)();