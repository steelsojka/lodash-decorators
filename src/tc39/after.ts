import { decoratorFactory } from './Tc39DecoratorFactory';
import { Tc39LodashDecorator } from '../factory/common';
import config from '../configs/after';

/**
 * The opposite of Before. This method creates a function that invokes once it's called n or more times.
 * @param {number} n The number of calls before the function is invoked.
 * @example
 *
 * class MyClass {
 *   @After(2)
 *   fn() {
 *     return 10;
 *   }
 * }
 *
 * const myClass = new MyClass();
 *
 * myClass.fn(); // => undefined
 * myClass.fn(); // => 10
 */
export const After: (time: number) => Tc39LodashDecorator = decoratorFactory.createInstanceDecorator(config);
export { After as after };
export default After;
