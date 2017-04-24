import { Applicator, ApplicateOptions } from './Applicator';

export class PostValueApplicator extends Applicator {
  apply({ config: { execute, bound }, args, value }: ApplicateOptions): any {
    return execute(...args, value);
  }
}