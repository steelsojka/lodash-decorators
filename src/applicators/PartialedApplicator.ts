import partial = require('lodash/partial');

import { Applicator, ApplicateOptions } from './Applicator';

export class PartialedApplicator extends Applicator {
  apply({ config: { execute }, value, args }: ApplicateOptions): any {
      // The `partial` function is over-constrained and generics locks proper use of rest parameter.
    return (partial as any)(execute as (...argsIn: any[]) => any, value, ...args);
  }
}
