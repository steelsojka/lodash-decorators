import { isFunction } from 'lodash';

import { copyMetadata, wrapConstructor } from './utils';
import { InstanceChainMap } from './factory';

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
  return (target: Function): Function => {
    return wrapConstructor(target, function(Ctor: Function, ...args: any[]) {
      bindAllMethods(target, this, methods);

      Ctor.apply(this, args);
    });
  };
}

function bindAllMethods(target: Function, instance: any, methods: string[] = []): void {
  let proto = target.prototype;

  while (proto && proto !== Object.prototype) {
    for (const key of Object.getOwnPropertyNames(proto)) {
      const include = methods.length ? methods.indexOf(key) !== -1 : true;
      const descriptor = Object.getOwnPropertyDescriptor(proto, key);

      if (include && key !== 'constructor' && !instance.hasOwnProperty(key)) {
        // If this property is a getter and it's NOT an instance decorated
        // method, ignore it. Instance decorators are getters until first accessed.
        if (descriptor.get) {
          const chainData = InstanceChainMap.get([ proto, key ]);

          if (!chainData || !chainData.isMethod) {
            continue;
          }
        }

        const value = instance[key];

        if (isFunction(value)) {
          Object.defineProperty(instance, key, {
            configurable: true,
            enumerable: descriptor.enumerable,
            value: copyMetadata(value.bind(instance), value),
            writable: descriptor.writable
          });
        }
      }
    }

    proto = Object.getPrototypeOf(proto);
  }
}

export { BindAll as bindAll };
export default BindAll;
