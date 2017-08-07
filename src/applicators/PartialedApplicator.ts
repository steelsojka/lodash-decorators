import { partial } from 'lodash';

import { Applicator, ApplicateOptions } from './Applicator';

export class PartialedApplicator extends Applicator {
  apply({ config: { execute }, value, args }: ApplicateOptions): any {
    return partial(execute, value, ...args);
  }
}
