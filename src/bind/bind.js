import isFunction from 'lodash/isFunction';
import bind from 'lodash/bind';
import copyMetaData from '../utils/copyMetaData';

import bindAll from './bindAll';
import Applicator from '../Applicator';

export default function bindWrapper(...args) {
  return function bindDecorator(...properties) {
    return properties.length === 1 ? bindAll(...args)(...properties) : bindMethod(...properties, ...args);
  };
}

function bindMethod(target, name, descriptor, ...args) {
  const { value, get, writable } = descriptor;

  return {
    configurable: true,
    // Allows the user to reassign the variable
    set(value) {
      Object.defineProperty(this, name, {
        configurable: true,
        value,
        writable
      });
    },
    get() {
      let thisValue = value;

      if (isFunction(get)) {
        thisValue = get.call(this);
      }

      let boundValue = thisValue;

      if (isFunction(thisValue)) {
        boundValue = bind(thisValue, this, ...args);
        copyMetaData(thisValue, boundValue);
      }

      Object.defineProperty(this, name, {
        writable,
        configurable: true,
        value: boundValue
      });

      return boundValue;
    }
  };
}
