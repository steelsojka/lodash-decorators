import isUndefined from 'lodash/lang/isUndefined';

export default class CompositeKeyWeakMap {
  constructor() {
    this.weakMap = new WeakMap();
  }

  set(keys, value) {
    let map = this.weakMap;

    for (let i = 0, len = keys.length - 1; i < len; i++) {
      let key = keys[i];
      let next = map.get(keys[i]);

      if (!next) {
        next = new Map();
        map.set(keys[i], next);
      }

      map = next;
    }

    map.set(keys[keys.length - 1], value);
  }

  get(keys) {
    let next = this.weakMap;

    for (let i = 0, len = keys.length; i < len; i++) {
      next = next.get(keys[i]);

      if (isUndefined(next)) {
        break;
      }
    }

    return next;
  }

  has(keys) {
    return !isUndefined(this.get(keys));
  }
}
