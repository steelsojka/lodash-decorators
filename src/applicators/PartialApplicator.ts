import { Applicator } from './Applicator';
import { resolveFunction } from '../utils';

export class PartialApplicator extends Applicator {
  apply(fn: Function, target: any, value: any, ...args: any[]): any {
    return function(...invokeArgs: any[]): any {
      return fn(resolveFunction(args[0], this, target), ...args.slice(1)).apply(this, invokeArgs);
    }
  }
}