import { Tc39LodashDecorator } from '../factory/common';
import { decoratorFactory } from './Tc39DecoratorFactory';
import config from '../configs/after';

/**
 * The opposite of Before. This method creates a function that invokes once it's called n or more times.
 * This spans across all instances of the class instead of the instance.
 * @param {number} n The number of calls before the function is invoked.
 * @example
 *
 * class MyClass {
 *   @AfterAll(2)
 *   fn() {
 *     return 10;
 *   }
 * }
 *
 * const myClass = new MyClass();
 * const myClass2 = new MyClass();
 *
 * myClass.fn(); // => undefined
 * myClass.fn(); // => 10
 *
 * myClass2.fn(); // => 10
 * myClass2.fn(); // => 10
 */
export const AfterAll: (n: number) => Tc39LodashDecorator = decoratorFactory.createDecorator(config);
export { AfterAll as afterAll };
export default AfterAll;
