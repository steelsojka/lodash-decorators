import { Applicator, ApplicateOptions } from './Applicator';
import { resolveFunction } from '../utils';

export class ComposeApplicator extends Applicator {
  apply({ config: { execute }, value, args, target }: ApplicateOptions): any {
    return function(...invokeArgs: any[]): any {
      return execute(value, ...args.map(method => resolveFunction(method, this, target))).apply(this, invokeArgs);
    };
  }
}