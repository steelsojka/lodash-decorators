'use strict';

import settings from './settings';
import { isFunction, bind } from 'lodash';

export default function bindDecorator(target, name, descriptor) {
  const { value, get, writable } = descriptor;
  let boundFn;

  return {
    configurable: true,
    get: function bindGetter() {
      if (isFunction(get)) {
        boundFn = bind(get, this);

        Object.defineProperty(this, name, {
          configurable: true,
          get: boundFn
        });

        return boundFn();
      } else {
        boundFn = bind(value, this);

        Object.defineProperty(this, name, {
          writable,
          configurable: true,
          value: boundFn
        });

        return boundFn;
      }
    }
  }
};
