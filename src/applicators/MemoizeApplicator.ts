import isFunction = require('lodash/isFunction');
import isObject = require('lodash/isObject');

import { Applicator, ApplicateOptions } from './Applicator';
import { resolveFunction } from '../utils';

export class MemoizeApplicator extends Applicator {
  apply({ value, instance, config: { execute }, args, target }: ApplicateOptions): any {
    let resolver = resolveFunction(
      isFunction(args[0]) ? args[0] : isObject(args[0]) ? args[0].resolver : args[0],
      instance,
      target,
      false
    );

    if (resolver && instance) {
      resolver = resolver.bind(instance);
    }

    const memoized = resolver ? execute(value, resolver) : execute(value);

    if (isObject(args[0])) {
      const { cache, type } = args[0];

      if (cache) {
        memoized.cache = cache;
      } else if (isFunction(type)) {
        memoized.cache = new (type as any)();
      }
    }

    return memoized;
  }
}
