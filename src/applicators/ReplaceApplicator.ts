import { Applicator, ApplicateOptions } from './Applicator';

export class ReplaceApplicator extends Applicator {
  apply({ fn, args }: ApplicateOptions): any {
    return fn(...args);
  }
}