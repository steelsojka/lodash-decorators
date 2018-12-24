import { LodashMethodDecorator } from '../factory/common';
import { legacyDecoratorFactory } from './LegacyDecoratorFactory';
import config from '../configs/ary';

/**
 * Creates a function that invokes func, with up to n arguments, ignoring any additional arguments.
 * @param {number} n The arity cap.
 * @example
 *
 * class MyClass {
 *   @Ary(1)
 *   fn(...args) {
 *     return args;
 *   }
 * }
 *
 * const myClass = new MyClass();
 *
 * myClass.fn(1, 2, 3, 4); // => [ 1 ]
 */
export const Ary: (n: number) => LodashMethodDecorator = legacyDecoratorFactory.createDecorator(config);
export { Ary as ary };
export default Ary;
