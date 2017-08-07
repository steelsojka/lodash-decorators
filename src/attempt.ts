import { attempt, partial } from 'lodash';

import { DecoratorConfig, DecoratorFactory, LodashMethodDecorator } from './factory';
import { PreValueApplicator } from './applicators';

const attemptFn = (fn: () => void) => partial(attempt, fn);
const decorator = DecoratorFactory.createDecorator(
  new DecoratorConfig(attemptFn, new PreValueApplicator())
);

/**
 * Attempts to invoke func, returning either the result or the caught error object. Any additional arguments are provided to func when it's invoked.
 * @param {...*} [args] The arguments to invoke func with.
 * @example
 *
 * class MyClass {
 *   @Attempt()
 *   fn(value) {
 *     if (typeof value === 'number') {
 *       return value
 *     }
 *
 *     throw new Error();
 *   }
 * }
 *
 * const myClass = new MyClass();
 *
 * myClass.fn(10); // => 10;
 * myClass.fn(null); // => Error
 */
export function Attempt(...partials: any[]): LodashMethodDecorator {
  return decorator(...partials);
}
export { Attempt as attempt };
export default decorator;
