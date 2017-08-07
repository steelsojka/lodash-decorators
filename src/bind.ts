import bind = require('lodash/bind');

import { DecoratorConfig, DecoratorFactory, LodashMethodDecorator } from './factory';
import { BindApplicator } from './applicators';

const decorator = DecoratorFactory.createInstanceDecorator(
  new DecoratorConfig(bind, new BindApplicator())
);

/**
 * Creates a function that invokes func with the this binding of thisArg and partials prepended to the arguments it receives.
 *
 * The _.bind.placeholder value, which defaults to _ in monolithic builds, may be used as a placeholder for partially applied arguments.
 *
 * Note: Unlike native Function#bind, this method doesn't set the "length" property of bound functions.
 * @param {...*} [partials] The argument to be partially applied.
 * @example
 *
 * class MyClass {
 *   @Bind()
 *   bound() {
 *     return this;
 *   }
 *
 *   unbound() {
 *     return this;
 *   }
 * }
 *
 * const myClass = new MyClass();
 *
 * myClass.bound.call(null); // => myClass {}
 * myClass.unbound.call(null); // => null
 */
export function Bind(...partials: any[]): LodashMethodDecorator {
  return decorator(...partials);
}
export { Bind as bind };
export default decorator;
