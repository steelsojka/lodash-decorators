import flowRight = require('lodash/flowRight');

import {
  DecoratorConfig,
  DecoratorFactory,
  LodashDecorator,
  ResolvableFunction
} from './factory';
import { ComposeApplicator } from './applicators';
/**
 * Creates a function that returns the result of invoking the given functions with the this binding of the created function,
 * where each successive invocation is supplied the return value of the previous.
 *
 * @example
 *
 * class MyClass {
 *   name = 'Ted';
 *
 *   @FlowRight(toUpperCase, 'getName')
 *   getUpperCaseName: () => string;
 *
 *   getName() {
 *     return this.name;
 *   }
 * }
 *
 * const myClass = new MyClass();
 *
 * myClass.getUpperCaseName(); // => 'TED'
 */
export function FlowRight(...fns: ResolvableFunction[]): LodashDecorator {
  return DecoratorFactory.createInstanceDecorator(
    new DecoratorConfig(flowRight, new ComposeApplicator({ post: false }), { property: true })
  )(...fns);
}
export { FlowRight as flowRight };
export default FlowRight;
