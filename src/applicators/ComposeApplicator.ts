import { Applicator, ApplicateOptions } from './Applicator';
import { resolveFunction } from '../utils';

export class ComposeApplicator extends Applicator {
  apply({ fn, value, args, target }: ApplicateOptions): any {
    return function(...invokeArgs: any[]): any {
      return fn(value, ...args.map(method => resolveFunction(method, this, target))).apply(this, invokeArgs);
    };
  }
}