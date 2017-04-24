import { Applicator, ApplicateOptions } from './Applicator';
import { resolveFunction } from '../utils';

export class WrapApplicator extends Applicator {
  apply({ args, config: { execute }, target, value }: ApplicateOptions): any {
    return function(...invokeArgs: any[]): any {
      return execute(resolveFunction(args[0], this, target), value).apply(this, invokeArgs);
    }
  }
}