import { after } from 'lodash';

import { DecoratorConfig, DecoratorFactory, LodashDecorator } from './factory';
import { PostValueApplicator } from './applicators';
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
export const After: (n: number) => LodashDecorator = DecoratorFactory.createInstanceDecorator(
  new DecoratorConfig(after, new PostValueApplicator(), { setter: true })
);
export { After as after };
export default After;