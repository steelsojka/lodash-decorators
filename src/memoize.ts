import memoize = require('lodash/memoize');

import {
  DecoratorConfig,
  DecoratorFactory,
  ResolvableFunction,
  BiTypedMethodDecorator1
} from './factory';
import { MemoizeApplicator } from './applicators';
import { MemoizeConfig } from './shared';

/**
 * Creates a function that memoizes the result of func. If resolver is provided,
 * it determines the cache key for storing the result based on the arguments provided to the memoized function.
 * By default, the first argument provided to the memoized function is used as the map cache key.
 * The func is invoked with the this binding of the memoized function.
 *
 * You can use a Function or a string that references a method on the class as the resolver.
 * You can also use a configuration object that lets provide a prexisting cache or specify
 * the map type to use.
 *
 * @example
 *
 * class MyClass {
 *   @Memoize({ type: WeakMap })
 *   getName(item) {
 *     return item.name;
 *   }
 *
 *   @Memoize('getName')
 *   getLastName(item) {
 *     return item.lastName;
 *   }
 * }
 */
export const Memoize = DecoratorFactory.createInstanceDecorator(
  new DecoratorConfig(memoize, new MemoizeApplicator(), { optionalParams: true })
) as BiTypedMethodDecorator1<ResolvableFunction | MemoizeConfig<any, any>>;
export { Memoize as memoize };
export default Memoize;
