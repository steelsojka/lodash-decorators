import { copyMetadata } from './utils';

export function BindAll(methods: string[] = []): ClassDecorator {
  return (target: Function): Function => {
    function BindAllWrapper(...args: any[]): any {
      bindAllMethods(target, this, methods);

      return target.apply(this, args);
    };

    BindAllWrapper.prototype = target.prototype;

    return BindAllWrapper;
  }
}

function bindAllMethods(target: Function, instance: any, methods: string[] = []): void {
  let proto = target.prototype;

  while (proto && proto !== Object.prototype) {
    for (const key of Object.getOwnPropertyNames(proto)) {
      const include = methods.length ? methods.indexOf(key) !== -1 : true;
      const descriptor = Object.getOwnPropertyDescriptor(proto, key);

      if (include && key !== 'constructor' && !instance.hasOwnProperty(key)) {
        console.log(instance[key]);
        Object.defineProperty(instance, key, {
          value: copyMetadata(instance[key].bind(instance), instance[key]),
          configurable: true,
          enumerable: descriptor.enumerable,
          writable: descriptor.writable
        });
      }
    }

    proto = Object.getPrototypeOf(proto);
  }
}