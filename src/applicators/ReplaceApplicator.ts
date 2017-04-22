import { Applicator } from './Applicator';

export class ReplaceApplicator extends Applicator {
  apply(fn: Function, target: any, value: any, ...args: any[]): any {
    return fn(...args);
  }
}