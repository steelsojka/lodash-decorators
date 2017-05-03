import isUndefined = require('lodash/isUndefined');

/**
 * A map for weakly holding nested references.
 * @private
 * @export
 * @class CompositeKeyWeakMap
 * @template T
 */
export class CompositeKeyWeakMap<T> {
  private _weakMap = new WeakMap<any, any>();

  set(keys: any[], value: T): void {
    let map = this._weakMap;

    for (let i = 0, len = keys.length - 1; i < len; i++) {
      const key = keys[i];
      let next = map.get(key);

      if (!next) {
        next = new Map();
        map.set(key, next);
      }

      map = next;
    }

    map.set(keys[keys.length - 1], value);
  }

  get(keys: any[]): T {
    let next = this._weakMap;

    for (let i = 0, len = keys.length; i < len; i++) {
      next = next.get(keys[i]);

      if (isUndefined(next)) {
        break;
      }
    }

    return next as any;
  }

  has(keys: any[]): boolean {
    return !isUndefined(this.get(keys));
  }
}
