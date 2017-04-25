import { Applicator, ApplicateOptions } from './Applicator';
import { resolveFunction } from '../utils';

export class MemoizeApplicator extends Applicator {
  apply({ value, instance, config: { execute }, args, target }: ApplicateOptions): any {
    if (!instance) {
      return execute(value, ...args);
    }

    let resolver = resolveFunction(args[0], instance, target, false);

    if (resolver) {
      resolver = resolver.bind(instance);
    }

    return resolver ? execute(value, resolver) : execute(value);
  }
}