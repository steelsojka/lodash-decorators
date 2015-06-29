'use strict';

import forOwn from 'lodash/object/forOwn';
import isFunction from 'lodash/lang/isFunction';
import partial from 'lodash/function/partial';

import CompositeKeyWeakMap from './utils/CompositeKeyWeakMap';
import Applicator from './Applicator';

export function createDecorator(method, type = Applicator.PRE) {
  return type === Applicator.SINGLE ? wrapper() : wrapper;

  function wrapper(...args) {
    return function decorator(target, name, descriptor) {
      const { value, get } = descriptor;

      if (get) {
        descriptor.get = Applicator.invoke(type, method, target, get, ...args);
        Applicator.copyMetaData(get, descriptor.get);
      } else if (value) {
        descriptor.value = Applicator.invoke(type, method, target, value, ...args); 
        Applicator.copyMetaData(value, descriptor.value);
      }

      return descriptor;
    };
  };
}

export function createInstanceDecorator(method, type = Applicator.PRE) {
  const objectMap = new CompositeKeyWeakMap();

  return type === Applicator.SINGLE ? wrapper() : wrapper;

  function wrapper(...args) {
    return function decorator(target, name, descriptor) {
      const { value, get } = descriptor;
      let toWrap = get ? get : value;

      if (get) {
        descriptor.get = Applicator.copyMetaData(toWrap, instanceDecoratorWrapper);
      } else {
        descriptor.value = Applicator.copyMetaData(toWrap, instanceDecoratorWrapper); 
      }

      return descriptor;
        
      function instanceDecoratorWrapper(...methodArgs) {
        if (!objectMap.has([this, toWrap])) {
          objectMap.set([this, toWrap], Applicator.invoke(type, method, this, toWrap, ...args));
        }

        const fn = objectMap.get([this, toWrap]);

        return fn.apply(this, methodArgs);
      };
    };
  };
}
