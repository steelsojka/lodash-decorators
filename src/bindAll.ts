import isFunction = require('lodash/isFunction');

import { InstanceChainMap } from './factory';
import { Bind } from './bind';

/**
 * Binds methods of an object to the object itself, overwriting the existing method.
 * @export
 * @param {string[]} [methods=[]]
 * @returns {ClassDecorator}
 * @example
 *
 * @BindAll()
 * class MyClass {
 *   bound() {
 *     return this;
 *   }
 *
 *   unbound() {
 *     return this;
 *   }
 * }
 *
 * const myClass = new MyClass();
 *
 * myClass.bound.call(null); // => MyClass {}
 * myClass.unbound.call(null); // => MyClass {}
 */
export function BindAll(methods: string[] = []): ClassDecorator {
  return (target: any) => {
    bindAllMethods(target, methods);
  };
}

function bindAllMethods(target: Function, methods: string[] = []): void {
  const targetProto = target.prototype;
  let proto = target.prototype;
  const boundKeys: string[] = [];

  while (proto && proto !== Object.prototype) {
    for (const key of Object.getOwnPropertyNames(proto)) {
      const include = methods.length ? methods.indexOf(key) !== -1 : true;
      const descriptor = Object.getOwnPropertyDescriptor(proto, key);

      if (include && key !== 'constructor') {
        // If this property is a getter and it's NOT an instance decorated
        // method, ignore it. Instance decorators are getters until first accessed.
        if (descriptor.get) {
          const chainData = InstanceChainMap.get([ proto, key ]);

          if (!chainData || !chainData.isMethod) {
            continue;
          }
        }

        if (isFunction(proto[key]) && boundKeys.indexOf(key) === -1) {
          Object.defineProperty(targetProto, key, Bind(proto, key, descriptor)!);
          boundKeys.push(key);
        }
      }
    }

    proto = Object.getPrototypeOf(proto);
  }
}

export { BindAll as bindAll };
export default BindAll;
