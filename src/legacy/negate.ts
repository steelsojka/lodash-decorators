import {
  DecoratorFactory,
  ResolvableFunction,
  BiTypedDecorator1
} from './factory';
import config from '../configs/negate';

/**
 * Negates a functions result or, when used on a property, creates a function that
 * negates the result of a provided function.
 * @param {ResolvableFunction} [fn] A resolvable function.
 * @example
 * class MyClass {
 *   @Negate('fn')
 *   fn2: () => boolean;
 *
 *   fn(): boolean {
 *     return true;
 *   }
 * }
 *
 * const myClass = new MyClass();
 *
 * myClass.fn2(); //=> false
 */
export const Negate = DecoratorFactory.legacy.createInstanceDecorator(
  config
) as BiTypedDecorator1<ResolvableFunction>;
export { Negate as negate };
export default Negate;
