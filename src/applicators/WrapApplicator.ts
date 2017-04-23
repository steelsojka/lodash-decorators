import { Applicator, ApplicateOptions } from './Applicator';
import { resolveFunction } from '../utils';

export class WrapApplicator extends Applicator {
  apply({ args, fn, target, value }: ApplicateOptions): any {
    return function(...invokeArgs: any[]): any {
      return fn(resolveFunction(args[0], this, target), value).apply(this, invokeArgs);
    }
  }
}