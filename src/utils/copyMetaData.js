import forOwn from 'lodash/forOwn';

/**
 * Used to copy over meta data from function to function.
 * If meta data is attached to a function. This can get lost
 * when wrapping functions. This tries to persist that.
 */
export function copyMetaData(to, from) {
  forOwn(from, (value, key) => to[key] = value);

  return to;
}
