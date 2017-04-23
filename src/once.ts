import { once } from 'lodash';

import { DecoratorConfig, DecoratorFactory } from './factory';
import { PreValueApplicator } from './applicators';

export const OnceDecoratorConfig = new DecoratorConfig(once, PreValueApplicator);
export const Once = DecoratorFactory.createInstanceDecorator(OnceDecoratorConfig)();