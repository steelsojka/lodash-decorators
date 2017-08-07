import debounce = require('lodash/debounce');

import { DecoratorConfig, DecoratorFactory, LodashMethodDecorator } from './factory';
import { PreValueApplicator } from './applicators';
import { DebounceOptions } from './shared';

const decorator = DecoratorFactory.createDecorator(
  new DecoratorConfig(debounce, new PreValueApplicator())
);

/**
 * Creates a debounced function that delays invoking func until after wait milliseconds have elapsed since the last time the debounced function was invoked.
 * The debounced function comes with a cancel method to cancel delayed func invocations and a flush method to immediately invoke them.
 * Provide options to indicate whether func should be invoked on the leading and/or trailing edge of the wait timeout. The func is invoked with the last arguments provided to the debounced function.
 * Subsequent calls to the debounced function return the result of the last func invocation.
 *
 * The debounce state is shared across all instances of the class.
 *
 * Note: If leading and trailing options are true, func is invoked on the trailing edge of the timeout only if the debounced function is invoked more than once during the wait timeout.
 *
 * If wait is 0 and leading is false, func invocation is deferred until to the next tick, similar to setTimeout with a timeout of 0.
 *
 * @param {number} [wait=0] The number in milliseconds to delay.
 * @param {DebounceOptions} [options] The options object.
 * @example
 *
 * class MyClass {
 *   value = 100;
 *
 *   @DebounceAll(10)
 *   add(a) {
 *     this.value += a;
 *   }
 * }
 *
 * const myClass = new MyClass();
 *
 * myClass.add(10);
 * myClass.add(50);
 * myClass.add(20);
 *
 * myClass.value; // => 100;
 *
 * setTimeout(() => {
 *   myClass.value; // => 120;
 * }, 11);
 */
export function DebounceAll(wait?: number, options?: DebounceOptions): LodashMethodDecorator {
  return decorator(wait, options);
}
export { DebounceAll as debounceAll };
export default decorator;
