import { flip } from 'lodash';

import { DecoratorConfig, DecoratorFactory, LodashMethodDecorator } from './factory';
import { PreValueApplicator } from './applicators';
/** 
 * Creates a function that invokes func with arguments reversed. Honestly, there is probably not much
 * use for this decorator but maybe you will find one?
 * 
 * @example
 * 
 * class MyClass {
 *   value = 100;
 * 
 *   @Flip()
 *   fn(a, b) {
 *     return [ a, b ];
 *   }
 * }
 * 
 * const myClass = new MyClass();
 * 
 * myClass.fn(10, 20); // => [ 20, 10 ]
 */
export const Flip: () => LodashMethodDecorator = DecoratorFactory.createDecorator(
  new DecoratorConfig(flip, new PreValueApplicator())
);
export { Flip as flip };
export default Flip;