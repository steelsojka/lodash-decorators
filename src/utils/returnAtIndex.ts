/**
 * Creates a function the returns the specific index.
 * @private
 * @export
 * @param {Function} fn
 * @param {number} index
 * @returns {Function}
 */
export function returnAtIndex(fn: Function, index: number): Function {
  return function(...args: any[]): any {
    fn.call(this, ...args);

    return args[index];
  };
}
