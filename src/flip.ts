import flip = require('lodash/flip');

import {
  DecoratorConfig,
  DecoratorFactory,
  LodashDecorator,
  ResolvableFunction
} from './factory';
import { PartialValueApplicator } from './applicators';

const decorator = DecoratorFactory.createInstanceDecorator(
  new DecoratorConfig(flip, new PartialValueApplicator(), { property: true })
);

/**
 * Creates a function that invokes func with arguments reversed. Honestly, there is probably not much
 * use for this decorator but maybe you will find one?
 *
 * @example
 *
 * class MyClass {
 *   value = 100;
 *
 *   @Flip('fn')
 *   fn2: (b: number, a: string) => [ number, string ];
 *
 *   fn(a: string, b: number): [ string, number ] {
 *     return [ a, b ];
 *   }
 * }
 *
 * const myClass = new MyClass();
 *
 * myClass.fn2(10, '20'); // => [ '20', 10 ]
 */
export function Flip(fn?: ResolvableFunction): LodashDecorator {
  return decorator(fn);
}
export { Flip as flip };
export default decorator;
