export interface ApplicateOptions {
  fn: Function;
  target: any;
  value: any;
  args: any[];
  instance?: Object;
}

export abstract class Applicator {
  abstract apply(options: ApplicateOptions): any;
}