import { DecoratorFactory, LodashMethodDecorator } from './factory';
import config from '../configs/overArgs';

const decorator = DecoratorFactory.legacy.createDecorator(config);

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
