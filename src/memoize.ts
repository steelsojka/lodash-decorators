import { memoize } from 'lodash';

import { 
  DecoratorConfig, 
  DecoratorFactory, 
  LodashMethodDecorator, 
  ResolvableFunction
} from './factory';
import { MemoizeApplicator } from './applicators';
import { MemoizeConfig } from './shared';

export const Memoize: (resolver?: ResolvableFunction|MemoizeConfig<any, any>) => LodashMethodDecorator = DecoratorFactory.createInstanceDecorator(
  new DecoratorConfig(memoize, new MemoizeApplicator())
);
export { Memoize as memoize };
export default Memoize;