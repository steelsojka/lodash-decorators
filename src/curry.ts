import curry = require('lodash/curry');

import { DecoratorConfig, DecoratorFactory, BiTypedMethodDecorator1 } from './factory';
import { PreValueApplicator } from './applicators';

/**
 * Creates a function that accepts arguments of func and either invokes func returning its result, if at least arity number of arguments have been provided, or returns a function that accepts the remaining func arguments, and so on.
 * The arity of func may be specified if func.length is not sufficient.
 * The original function is bound to the instance. If the method is needed to call in a different context use `CurryAll`.
 *
 * The _.curry.placeholder value, which defaults to _ in monolithic builds, may be used as a placeholder for provided arguments.
 *
 * Note: This method doesn't set the "length" property of curried functions.
 * @param {number} [arity] The arity of func.
 * @example
 *
 * class MyClass {
 *   multiplier = 2;
 *
 *   @Curry()
 *   add(a, b) {
 *     return (a + b) * this.multiplier;
 *   }
 * }
 *
 * const myClass = new MyClass();
 *
 * const add5 = myClass.add(5);
 *
 * add5AndMultiply(10); // => 30
 */
export const Curry = DecoratorFactory.createInstanceDecorator(
  new DecoratorConfig(curry, new PreValueApplicator(), { bound: true, optionalParams: true })
) as BiTypedMethodDecorator1<number>;
export { Curry as curry };
export default Curry;
