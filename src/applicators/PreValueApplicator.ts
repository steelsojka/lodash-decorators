import { Applicator, ApplicateOptions } from './Applicator';

export class PreValueApplicator extends Applicator {
  apply({ value, fn, args }: ApplicateOptions): any {
    return fn(value, ...args);
  }
}