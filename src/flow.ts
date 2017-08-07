import flow = require('lodash/flow');

import {
  DecoratorConfig,
  DecoratorFactory,
  ResolvableFunction,
  LodashDecorator
} from './factory';
import { ComposeApplicator } from './applicators';

const decorator = DecoratorFactory.createInstanceDecorator(
  new DecoratorConfig(flow, new ComposeApplicator({ post: true }), { property: true })
);

/**
 * Creates a function that returns the result of invoking the given functions with the this binding of the created function,
 * where each successive invocation is supplied the return value of the previous.
 *
 * @example
 *
 * class MyClass {
 *   name = 'Ted';
 *
 *   @Flow('getName', toUpperCase)
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
export function Flow(...fns: ResolvableFunction[]): LodashDecorator {
  return decorator(...fns);
}
export { Flow as flow };
export default decorator;
