'use strict';

import forOwn from 'lodash/object/forOwn';
import isFunction from 'lodash/lang/isFunction';
import partial from 'lodash/function/partial';

import CompositeKeyWeakMap from './utils/CompositeKeyWeakMap';
import Applicator from './Applicator';

const { applicators } = Applicator;

export function createDecorator(method, applicator = applicators.pre) {
  const getterSetterMap = new CompositeKeyWeakMap();

  return applicator === applicators.single ? wrapper() : wrapper;

  function wrapper(...args) {
    return function decorator(target, name, descriptor) {
      const { value, get, set } = descriptor;

      if (get && !getterSetterMap.has([target, name, 'get'])) {
        descriptor.get = Applicator.invoke(applicator, method, target, get, ...args);
        Applicator.copyMetaData(get, descriptor.get);
        getterSetterMap.set([target, name, 'get'], descriptor.get);

      } else if (set && !getterSetterMap.has([target, name, 'set'])) {
        descriptor.set = Applicator.invoke(applicator, method, target, set, ...args);
        Applicator.copyMetaData(get, descriptor.set);
        getterSetterMap.set([target, name, 'set'], descriptor.set);

      } else if (value) {
        descriptor.value = Applicator.invoke(applicator, method, target, value, ...args); 
        Applicator.copyMetaData(value, descriptor.value);
      }

      return descriptor;
    };
  };
}

export function createInstanceDecorator(method, applicator = applicators.pre) {
  const objectMap = new CompositeKeyWeakMap();
  const getterSetterMap = new CompositeKeyWeakMap();

  return applicator === applicators.single ? wrapper() : wrapper;

  function wrapper(...args) {
    return function decorator(target, name, descriptor) {
      const { value, get, set } = descriptor;

      if (get && !getterSetterMap.has([target, name, 'get'])) {
        descriptor.get = Applicator.copyMetaData(get, partial(instanceDecoratorWrapper, get));
        getterSetterMap.set([target, name, 'get'], descriptor.get);

      } else if (set && !getterSetterMap.has([target, name, 'set'])) {
        descriptor.set = Applicator.copyMetaData(set, partial(instanceDecoratorWrapper, set));
        getterSetterMap.set([target, name, 'set'], descriptor.set);

      } else if (value) {
        descriptor.value = Applicator.copyMetaData(value, partial(instanceDecoratorWrapper, value)); 
      }

      return descriptor;
        
      function instanceDecoratorWrapper(toWrap, ...methodArgs) {
        if (!objectMap.has([this, toWrap])) {
          objectMap.set([this, toWrap], Applicator.invoke(applicator, method, this, toWrap, ...args));
        }

        const fn = objectMap.get([this, toWrap]);

        return fn.apply(this, methodArgs);
      };
    };
  };
}
