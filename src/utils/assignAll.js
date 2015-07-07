'use strict';

import without from 'lodash/array/without';

export default function assignAll(to, from, excludes = []) {
  const names = without(Object.getOwnPropertyNames(from), ...excludes);

  for (let i = 0, len = names.length; i < len; i++) {
    let name = names[i];

    let destDtor = Object.getOwnPropertyDescriptor(to, name);

    if (!destDtor || destDtor.configurable) {
      let srcDtor = Object.getOwnPropertyDescriptor(from, name);
      Object.defineProperty(to, name, srcDtor);
    }
  }

  return to;
}
