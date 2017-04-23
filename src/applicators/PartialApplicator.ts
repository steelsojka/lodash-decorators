import { Applicator, ApplicateOptions } from './Applicator';
import { resolveFunction } from '../utils';

export class PartialApplicator extends Applicator {
  apply({ args, target, fn }: ApplicateOptions): any {
    return function(...invokeArgs: any[]): any {
      return fn(resolveFunction(args[0], this, target), ...args.slice(1)).apply(this, invokeArgs);
    }
  }
}