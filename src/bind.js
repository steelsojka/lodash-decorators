'use strict';

import settings from './settings';
import { isFunction, bind } from 'lodash';

export default function bindWrapper(...args) {
  return function bindDecorator(...properties) {
    return properties.length === 1 ? bindClass(...properties, ...args) : bindMethod(...properties, ...args);
  };
};

function bindClass(target, name, descriptor, ...args) {
  const keys = Reflect.ownKeys(target.prototype).forEach(key => {
    if (key !== 'constructor') {
      let descriptor = Object.getOwnPropertyDescriptor(target.prototype, key);

      if (isFunction(descriptor.value)) {
        Object.defineProperty(target.prototype, key, bindMethod(target, key, descriptor));
      }
    }
  });
}

function checkBindValue(value) {
  if (!isFunction(value)) {
    throw new Error('Binds can not be used on getters, setters, or properties');
  }
}

function bindMethod(target, name, descriptor, ...args) {
  const { value, get, writable } = descriptor;

  return {
    configurable: true,
    get: function bindGetter() {
      let thisValue = value;

      if (isFunction(get)) {
        thisValue = get.call(this);
      }

      checkBindValue(thisValue);

      let boundFn = bind(thisValue, this, ...args);

      Object.defineProperty(this, name, {
        writable,
        configurable: true,
        value: boundFn
      });

      return boundFn;
    }
  }
}
