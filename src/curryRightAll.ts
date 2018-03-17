import curryRight = require('lodash/curryRight');

import { DecoratorConfig, DecoratorFactory, BiTypedMethodDecorator1 } from './factory';
import { PreValueApplicator } from './applicators';

/**
 * This method is like _.curry except that arguments are applied to func in the manner of _.partialRight instead of _.partial.
 * The arity of func may be specified if func.length is not sufficient.
 * The original function is bound to the instance. If the method is needed to call in a different context use `CurryAll`.
 *
 * The _.curryRight.placeholder value, which defaults to _ in monolithic builds, may be used as a placeholder for provided arguments.
 *
 * Note: This method doesn't set the "length" property of curried functions.
 * @param {number} [arity] The arity of func.
 * @example
 *
 * class MyClass {
 *   @CurryRightAll()
 *   add(a, b) {
 *     return (a + b);
 *   }
 * }
 *
 * const myClass = new MyClass();
 *
 * const add5 = myClass.add(5);
 *
 * add5AndMultiply(10); // => 15
 */
export const CurryRightAll = DecoratorFactory.createDecorator(
  new DecoratorConfig(curryRight, new PreValueApplicator(), { optionalParams: true })
) as BiTypedMethodDecorator1<number>;
export { CurryRightAll as curryRightAll };
export default CurryRightAll;
