import { Applicator } from './Applicator';

export class PostValueApplicator extends Applicator {
  apply(fn: Function, target: any, value: any, ...args: any[]): any {
    return fn(...args, value);
  }
}