'use strict';

export default function writableWrapper(writable = true) {
  return function writableDecorator(target, name, descriptor) {
    descriptor.writable = writable;
    return descriptor;
  };
}
