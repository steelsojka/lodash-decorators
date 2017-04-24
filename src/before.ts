import { before } from 'lodash';

import { DecoratorConfig, DecoratorFactory, LodashDecorator } from './factory';
import { PostValueApplicator } from './applicators';
/**
 * Creates a function that invokes func, with the this binding and arguments of the created function, while it's called less than n times. 
 * Subsequent calls to the created function return the result of the last func invocation.
 * @param {number} n The number of calls at whichc func is no longer invoked.
 * @example
 * 
 * let calls = 0;
 * 
 * class MyClass {
 *   @Before(3)
 *   fn() {
 *     calls++;
 *   }
 * }
 * 
 * const myClass = new MyClass();
 * 
 * myClass.fn();
 * myClass.fn();
 * myClass.fn();
 * myClass.fn();
 * 
 * calls === 2; // => true
 */
export const Before: (n: number) => LodashDecorator = DecoratorFactory.createInstanceDecorator(new DecoratorConfig(before, PostValueApplicator));
export { Before as before };
export default Before;