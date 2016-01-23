import mixin from 'lodash/mixin';
import log from './utils/log';

export default function mixinDecoratorWrapper(src, options) {
  return function mixinDecorator(target, name, descriptor) {
    if (arguments.length > 1) {
      throw new Error(log('Mixin decorator can only be applied to classes'));
    }

    mixin(target.prototype, src, options);

    return target;
  };
}
