import { flip } from 'lodash';

import { DecoratorConfig, DecoratorFactory } from './factory';
import { PreValueApplicator } from './applicators';

export const Flip = DecoratorFactory.createDecorator(new DecoratorConfig(flip, PreValueApplicator))();