import { copyMetadata } from './utils';

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
    function BindAllWrapper(...args: any[]): any {
      bindAllMethods(target, this, methods);

      target.apply(this, args);
    }

    BindAllWrapper.prototype = target.prototype;

    return BindAllWrapper;
  };
}

function bindAllMethods(target: Function, instance: any, methods: string[] = []): void {
  let proto = target.prototype;

  while (proto && proto !== Object.prototype) {
    for (const key of Object.getOwnPropertyNames(proto)) {
      const include = methods.length ? methods.indexOf(key) !== -1 : true;
      const descriptor = Object.getOwnPropertyDescriptor(proto, key);

      if (include && key !== 'constructor' && !instance.hasOwnProperty(key)) {
        Object.defineProperty(instance, key, {
          configurable: true,
          enumerable: descriptor.enumerable,
          value: copyMetadata(instance[key].bind(instance), instance[key]),
          writable: descriptor.writable
        });
      }
    }

    proto = Object.getPrototypeOf(proto);
  }
}

export { BindAll as bindAll };
export default BindAll;
