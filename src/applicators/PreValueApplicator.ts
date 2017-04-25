import { Applicator, ApplicateOptions } from './Applicator';

export class PreValueApplicator extends Applicator {
  apply({ value, config: { execute }, args }: ApplicateOptions): any {
    return execute(value, ...args);
  }
}