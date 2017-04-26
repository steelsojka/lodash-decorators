import { memoize } from 'lodash';

import { 
  DecoratorConfig, 
  DecoratorFactory, 
  LodashMethodDecorator, 
  ResolvableFunction
} from './factory';
import { MemoizeApplicator } from './applicators';

export const Memoize: (resolver?: ResolvableFunction) => LodashMethodDecorator = DecoratorFactory.createInstanceDecorator(
  new DecoratorConfig(memoize, new MemoizeApplicator())
);
export { Memoize as memoize };
export default Memoize;