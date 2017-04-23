import { Applicator, ApplicateOptions } from './Applicator';

export class PostValueApplicator extends Applicator {
  apply({ fn, args, value }: ApplicateOptions): any {
    return fn(...args, value);
  }
}