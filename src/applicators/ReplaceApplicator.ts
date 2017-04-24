import { Applicator, ApplicateOptions } from './Applicator';

export class ReplaceApplicator extends Applicator {
  apply({ config: { execute }, args }: ApplicateOptions): any {
    return execute(...args);
  }
}