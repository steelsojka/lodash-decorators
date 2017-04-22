export abstract class Applicator {
  abstract apply(fn: Function, target: any, value: any, ...args: any[]): any;
}