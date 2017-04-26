import { ary } from 'lodash';

import { DecoratorConfig, DecoratorFactory, LodashMethodDecorator } from './factory';
import { PreValueApplicator } from './applicators';
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
export const Ary: (n: number) => LodashMethodDecorator = DecoratorFactory.createDecorator(
  new DecoratorConfig(ary, new PreValueApplicator())
);
export { Ary as ary };
export default Ary;