import forOwn from 'lodash/object/forOwn';

/**
 * Used to copy over meta data from function to function.
 * If meta data is attached to a function. This can get lost
 * when wrapping functions. This tries to persist that.
 */
export default function copyMetaData(to, from) {
  forOwn(from, (value, key) => to[key] = value);
  return to;
}
