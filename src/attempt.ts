import { attempt, partial } from 'lodash';

import { DecoratorConfig, DecoratorFactory, LodashMethodDecorator } from './factory';
import { PreValueApplicator } from './applicators';

const _attempt = (fn: Function) => partial(attempt, fn);
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
export const Attempt: (...partials: any[]) => LodashMethodDecorator = DecoratorFactory.createInstanceDecorator(new DecoratorConfig(_attempt, PreValueApplicator));
export { Attempt as attempt };
export default Attempt;
