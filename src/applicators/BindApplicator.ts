import { Applicator, ApplicateOptions } from './Applicator';

export class BindApplicator extends Applicator {
  apply({ value, fn, args, instance, target }: ApplicateOptions): any {
    if (!instance) {
      return value;
    }

    return fn(value, instance, ...args);
  }
}