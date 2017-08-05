import delay = require('lodash/delay');

import { DecoratorConfig, DecoratorFactory, LodashMethodDecorator } from './factory';
import { PreValueApplicator } from './applicators';

const decorator = DecoratorFactory.createDecorator(
  new DecoratorConfig(
    function(value: Function, wait: number, ...args: any[]) {
      return function(...invokeArgs: any[]): any {
        return delay(value.bind(this), wait, ...invokeArgs, ...args);
      };
    },
    new PreValueApplicator(),
    { setter: true }
  )
);

/**
 * Invokes func after wait milliseconds. Any additional arguments are provided to func when it's invoked.
 *
 * @param {number} wait The number of milliseconds to delay invocation.
 * @param {...*} [args] Additional arguments to invoke the function with
 * @example
 *
 * class MyClass {
 *   value = 100;
 *
 *   @Delay(20)
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
 * }, 30);
 */
export function Delay(wait: number, ...args: any[]): LodashMethodDecorator {
  return decorator(wait, ...args);
}
export { Delay as delay };
export default decorator;
