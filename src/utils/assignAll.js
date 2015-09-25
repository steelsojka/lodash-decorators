import without from 'lodash/array/without';
import isObject from 'lodash/lang/isObject';
import attempt from 'lodash/utility/attempt';

export const FUNCTION_PROPERTY_EXCLUDES = [
  'length',
  'name',
  'arguments',
  'caller',
  'prototype'
];

/**
 * Assigns all properties, including non-enumerable properties over
 * to the destination object.
 */
export default function assignAll(to, from, excludes = []) {
  const names = without(Object.getOwnPropertyNames(from), ...excludes);

  for (let i = 0, len = names.length; i < len; i++) {
    let name = names[i];

    attempt(assignProperty, to, from, name);
  }

  return to;
}

export function assignProperty(to, from, name) {
  let destDtor = Object.getOwnPropertyDescriptor(to, name);

  if (!destDtor || destDtor.configurable) {
    let srcDtor = Object.getOwnPropertyDescriptor(from, name);

    if (isObject(srcDtor)) {
      Object.defineProperty(to, name, srcDtor);
    } else {
      // Fallback to regular assignment
      to[name] = from[name];
    }
  }
}
