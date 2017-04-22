import { partial } from 'lodash';

import { Applicator } from './Applicator';

export class PartialedApplicator extends Applicator {
  apply(fn: Function, target: any, value: any, ...args: any[]): any {
    return partial(fn, value, ...args);
  }
}