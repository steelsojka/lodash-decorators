import defer = require('lodash/defer');

import { DecoratorConfig, DecoratorFactory, LodashMethodDecorator } from './factory';
import { InvokeApplicator } from './applicators';
/**
 * Defers invoking the func until the current call stack has cleared. Any additional arguments are provided to func when it's invoked.
 *
 * @param {...*} [args] Additional arguments to invoke the function with
 * @example
 *
 * class MyClass {
 *   value = 100;
 *
 *   @Defer()
 *   add(a) {
 *     this.value += a;
 *   }
 * }
 *
 * const myClass = new MyClass();
 *
 * myClass.add(10);
 *
 * myClass.value; // => 100;
 *
 * setTimeout(() => {
 *   myClass.value; // => 110;
 * }, 0);
 */
export function Defer(...args: any[]): LodashMethodDecorator {
  return DecoratorFactory.createDecorator(
    new DecoratorConfig(defer, new InvokeApplicator(), { setter: true })
  )(...args);
}
export { Defer as defer };
export default Defer;
