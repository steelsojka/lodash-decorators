import { wrap } from 'lodash';

import { 
  DecoratorConfig, 
  DecoratorFactory,
  ResolvableFunction,
  LodashMethodDecorator
} from './factory';
import { WrapApplicator } from './applicators';

export const WrapDecoratorConfig = new DecoratorConfig(wrap, WrapApplicator);
export const Wrap: (wrapper?: ResolvableFunction) => LodashMethodDecorator = DecoratorFactory.createDecorator(WrapDecoratorConfig);