import { assign } from 'lodash';

export function Mixin(...srcs: Object[]): ClassDecorator {
  return (target: Function) => {
    assign(target.prototype, ...srcs);

    return target;
  };
}
export { Mixin as mixin };
export default Mixin;