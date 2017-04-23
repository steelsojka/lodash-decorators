export function returnAtIndex(fn: Function, index: number): Function {
  return function(...args: any[]): any {
    fn.call(this, ...args);

    return args[index];
  };
}
