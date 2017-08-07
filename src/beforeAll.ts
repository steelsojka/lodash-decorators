import before = require('lodash/before');

import { DecoratorConfig, DecoratorFactory, LodashDecorator } from './factory';
import { PostValueApplicator } from './applicators';

const decorator = DecoratorFactory.createDecorator(
  new DecoratorConfig(before, new PostValueApplicator(), { setter: true })
);

/**
 * Creates a function that invokes func, with the this binding and arguments of the created function, while it's called less than n times.
 * Subsequent calls to the created function return the result of the last func invocation.
 * @param {number} n The number of calls at whichc func is no longer invoked.
 * @example
 *
 * let calls = 0;
 *
 * class MyClass {
 *   @BeforeAll(3)
 *   fn() {
 *     calls++;
 *   }
 * }
 *
 * const myClass = new MyClass();
 * const myClass2 = new MyClass();
 *
 * myClass.fn();
 * myClass.fn();
 * myClass.fn();
 * myClass.fn();
 *
 * myClass2.fn();
 *
 * calls === 3; // => true
 */
export function BeforeAll(n: number): LodashDecorator {
  return decorator(n);
}
export { BeforeAll as beforeAll };
export default decorator;
