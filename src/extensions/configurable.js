'use strict';

export default function configurableWrapper(configurable = true) {
  return function configurableDecorator(target, name, descriptor) {
    descriptor.configurable = configurable;
    return descriptor;
  }
}
