import without = require('lodash/without');
import attempt = require('lodash/attempt');
import isObject = require('lodash/isObject');

/**
 * Assigns all properties from an object to another object including non enumerable
 * properties.
 * @export
 * @template T
 * @template U
 * @param {T} to
 * @param {U} from
 * @param {string[]} [excludes=[]]
 * @returns {T}
 */
export function assignAll<T, U>(to: T, from: U, excludes: string[] = []): T {
  const properties = without(Object.getOwnPropertyNames(from), ...excludes);

  for (const prop of properties) {
    attempt(assignProperty, to, from, prop);
  }

  return to;
}

/**
 * Assigns a property from one object to another while retaining descriptor properties.
 * @export
 * @template T
 * @template U
 * @param {T} to
 * @param {U} from
 * @param {string} prop
 */
export function assignProperty<T, U>(to: T, from: U, prop: string): void {
  const descriptor = Object.getOwnPropertyDescriptor(to, prop);

  if (!descriptor || descriptor.configurable) {
    const srcDescriptor = Object.getOwnPropertyDescriptor(from, prop);

    if (isObject(srcDescriptor)) {
      Object.defineProperty(to, prop, srcDescriptor);
    } else {
      (to as any)[prop] = (from as any)[prop];
    }
  }
}
