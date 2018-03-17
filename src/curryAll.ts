import curry = require('lodash/curry');

import { DecoratorConfig, DecoratorFactory, BiTypedDecorator1 } from './factory';
import { PreValueApplicator } from './applicators';

/**
 * Creates a function that accepts arguments of func and either invokes func returning its result, if at least arity number of arguments have been provided, or returns a function that accepts the remaining func arguments, and so on.
 * The arity of func may be specified if func.length is not sufficient.
 *
 * The _.curry.placeholder value, which defaults to _ in monolithic builds, may be used as a placeholder for provided arguments.
 *
 * Note: This method doesn't set the "length" property of curried functions.
 * Note: The original function invoked will not be called in the context of the instance. Use `Curry` to for using it bound.
 * @param {number} [arity] The arity of func.
 * @example
 *
 * class MyClass {
 *   @CurryAll()
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
export const CurryAll = DecoratorFactory.createDecorator(
  new DecoratorConfig(curry, new PreValueApplicator(), { optionalParams: true })
) as BiTypedDecorator1<number>;
export { CurryAll as curryAll };
export default CurryAll;
