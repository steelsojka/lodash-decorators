import isFunction = require('lodash/isFunction');
import isObjectLike = require('lodash/isObjectLike');

import { Applicator, ApplicateOptions } from './Applicator';
import { resolveFunction } from '../utils';

export class MemoizeApplicator extends Applicator {
  apply({ value, instance, config: { execute }, args: [arg], target }: ApplicateOptions): any {
    let resolver = resolveFunction(
      isFunction(arg) ? arg : isObjectLike(arg) ? arg.resolver : arg,
      instance,
      target,
      false
    );

    if (resolver && instance) {
      resolver = resolver.bind(instance);
    }

    const memoized = resolver ? execute(value, resolver) : execute(value);

    if (isObjectLike(arg)) {
      const { cache, type } = arg;

      if (cache) {
        memoized.cache = cache;
      } else if (isFunction(type)) {
        memoized.cache = new (type as any)();
      }
    }

    return memoized;
  }
}
