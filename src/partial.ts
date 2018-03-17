import partial = require('lodash/partial');

import { DecoratorConfig, DecoratorFactory } from './factory';
import { PartialApplicator } from './applicators';

const decorator = DecoratorFactory.createInstanceDecorator(
  new DecoratorConfig(partial, new PartialApplicator(), { property: true, method: false })
);

/**
 * Partially applies arguments to a function.
 * @export
 * @param {...any[]} partials
 * @returns {PropertyDecorator}
 * @example
 * class MyClass {
 *   lastName: string = 'Schmo';
 *
 *   @Partial('fn', 'Joe')
 *   fn2: () => string;
 *
 *   fn(name: string): string {
 *     return `${name} ${this.lastName}`;
 *   }
 * }
 *
 * const myClass = new MyClass();
 *
 * myClass.fn2(); //=> 'Joe Schmo'
 */
export function Partial(...partials: any[]): PropertyDecorator {
  return decorator(...partials);
}
export { Partial as partial };
export default decorator;
