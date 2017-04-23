import { wrap } from 'lodash';

import { 
  DecoratorConfig, 
  DecoratorFactory,
  ResolvableFunction,
  LodashDecorator
} from './factory';
import { WrapApplicator } from './applicators';

export const WrapDecoratorConfig = new DecoratorConfig(wrap, WrapApplicator);
export const Wrap: (wrapper?: ResolvableFunction) => LodashDecorator = DecoratorFactory.createDecorator(WrapDecoratorConfig);