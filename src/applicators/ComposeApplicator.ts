import { Applicator } from './Applicator';
import { resolveFunction } from '../utils';

export class ComposeApplicator extends Applicator {
  apply(fn: Function, target: any, value: any, ...args: any[]): any {
    return function(...invokeArgs: any[]): any {
      return fn(value, ...args.map(method => resolveFunction(method, this, target))).apply(this, invokeArgs);
    };
  }
}