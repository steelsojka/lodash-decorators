import { Applicator, ApplicateOptions } from './Applicator';

export class PreValueApplicator extends Applicator {
  apply({ value, config: { execute, bound }, args }: ApplicateOptions): any {
    return execute(value, ...args);
  }
}