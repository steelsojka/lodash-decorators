import { Applicator } from './Applicator';

export class PreValueApplicator extends Applicator {
  apply(fn: Function, target: any, value: any, ...args: any[]): any {
    return fn(value, ...args);
  }
}