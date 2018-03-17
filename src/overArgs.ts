import overArgs = require('lodash/overArgs');

import { DecoratorConfig, DecoratorFactory, LodashMethodDecorator } from './factory';
import { PreValueApplicator } from './applicators';

const decorator = DecoratorFactory.createDecorator(
  new DecoratorConfig(overArgs, new PreValueApplicator(), { setter: true })
);

/**
 * Creates a function that invokes func with its arguments transformed.
 * @export
 * @param {...Function[]} transforms
 * @returns {LodashMethodDecorator}
 * @example
 * class MyClass {
 *   @OverArgs(_.castArray)
 *   fn(list) {
 *     return list;
 *   }
 * }
 *
 * const myClass = new MyClass();
 *
 * myClass.fn([ 1 ]); //=> [ 1 ];
 * myClass.fn(1); //=> [ 1 ];
 */
export function OverArgs(...transforms: Function[]): LodashMethodDecorator {
  return decorator(...transforms);
}
export { OverArgs as overArgs };
export default decorator;
