import after = require('lodash/after');

import { DecoratorConfig, DecoratorFactory, LodashDecorator } from './factory';
import { PostValueApplicator } from './applicators';

const decorator = DecoratorFactory.createDecorator(
  new DecoratorConfig(after, new PostValueApplicator(), { setter: true })
);

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
export function AfterAll(n: number): LodashDecorator {
  return decorator(n);
}
export { AfterAll as afterAll };
export default decorator;
