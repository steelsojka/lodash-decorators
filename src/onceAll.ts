import once = require('lodash/once');

import { DecoratorConfig, DecoratorFactory, BiTypedDecorator } from './factory';
import { PreValueApplicator } from './applicators';

/**
 * Creates a function that is restricted to invoking func once. Repeat calls to the function return the value of the first invocation.
 * This is shared across all instances of the class.
 * @example
 * const value = 0;
 *
 * class MyClass {
 *   @Once()
 *   fn(): number {
 *     return ++value;
 *   }
 * }
 *
 * const myClass = new MyClass();
 * const myClass2 = new MyClass();
 *
 * myClass.fn(); //=> 1
 * myClass2.fn(); //=> 1
 */
export const OnceAll = DecoratorFactory.createDecorator(
  new DecoratorConfig(once, new PreValueApplicator(), { setter: true, optionalParams: true })
) as BiTypedDecorator;
export { OnceAll as onceAll };
export default OnceAll;
