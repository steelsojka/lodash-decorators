import { Applicator, ApplicateOptions } from './Applicator';

export class InvokeApplicator extends Applicator {
  apply({ args, target, config: { execute }, value }: ApplicateOptions): any {
    return function(...invokeArgs: any[]): any {
      return execute(value.bind(this), ...invokeArgs, ...args);
    }
  }
}
