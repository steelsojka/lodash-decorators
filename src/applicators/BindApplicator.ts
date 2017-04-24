import { Applicator, ApplicateOptions } from './Applicator';

export class BindApplicator extends Applicator {
  apply({ value, config: { execute } , args, instance, target }: ApplicateOptions): any {
    if (!instance) {
      return value;
    }

    return execute(value, instance, ...args);
  }
}