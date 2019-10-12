import { DecoratorFactory, BiTypedMethodDecorator } from './factory';
import config from './configs/attempt';

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
export const Attempt = DecoratorFactory.tc39.createDecorator(config) as BiTypedMethodDecorator;
export { Attempt as attempt };
export default Attempt;
