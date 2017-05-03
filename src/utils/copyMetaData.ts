import forOwn = require('lodash/forOwn');

/**
 * Used to copy over meta data from function to function.
 * If meta data is attached to a function. This can get lost
 * when wrapping functions. This tries to persist that.
 * @private
 */
export function copyMetadata(to: any, from: any): any {
  forOwn(from, (value: any, key: string) => to[key] = value);

  return to;
}
