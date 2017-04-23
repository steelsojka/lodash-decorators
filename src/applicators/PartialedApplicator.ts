import { partial } from 'lodash';

import { Applicator, ApplicateOptions } from './Applicator';

export class PartialedApplicator extends Applicator {
  apply({ fn, value, args }: ApplicateOptions): any {
    return partial(fn, value, ...args);
  }
}