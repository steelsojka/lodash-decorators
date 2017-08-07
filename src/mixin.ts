import { assign } from 'lodash';

/**
 * Mixins an object into the classes prototype.
 * @export
 * @param {...Object[]} srcs
 * @returns {ClassDecorator}
 * @example
 *
 * const myMixin = {
 *   blorg: () => 'blorg!'
 * }
 *
 * @Mixin(myMixin)
 * class MyClass {}
 *
 * const myClass = new MyClass();
 *
 * myClass.blorg(); // => 'blorg!'
 */
export function Mixin(...srcs: Object[]): ClassDecorator {
  return (target: Function) => {
    assign(target.prototype, ...srcs);

    return target;
  };
}
export { Mixin as mixin };
export default Mixin;
