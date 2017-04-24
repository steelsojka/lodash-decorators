import { negate } from 'lodash';

import { DecoratorConfig, DecoratorFactory } from './factory';
import { PreValueApplicator } from './applicators';

export const Negate = DecoratorFactory.createDecorator(new DecoratorConfig(negate, PreValueApplicator))();