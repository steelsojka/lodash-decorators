'use strict';

import forOwn from 'lodash/object/forOwn';
import isFunction from 'lodash/lang/isFunction';
import partial from 'lodash/function/partial';

import CompositeKeyWeakMap from './utils/CompositeKeyWeakMap';
import copyMetaData from './utils/copyMetaData';
import Applicator from './Applicator';

const { applicators } = Applicator;

export const decorateTargets = {
  GET: 'get',
  SET: 'set',
  VALUE: 'value',
  INITIALIZER: 'initializer'
};

export function getDecoratorTarget(target, name, descriptor, getterSetterMap) {
  if (descriptor.get && !getterSetterMap.has([target, name, 'get'])) {
    return decorateTargets.GET;
  } else if (descriptor.set && !getterSetterMap.has([target, name, 'set'])) {
    return decorateTargets.SET;
  } else if (descriptor.value) {
    return decorateTargets.VALUE;
  } else if (descriptor.initializer) {
    return decorateTargets.INITIALIZER;
  }

  throw new ReferenceError('Invalid decorator target.');
}

export function createDecorator(method, applicator = applicators.pre) {
  const getterSetterMap = new CompositeKeyWeakMap();

  return applicator === applicators.single ? wrapper() : wrapper;

  function wrapper(...args) {
    return function decorator(target, name, descriptor) {
      const decoratorTarget = getDecoratorTarget(target, name, descriptor, getterSetterMap);
      const preTransform = descriptor[decoratorTarget];

      descriptor[decoratorTarget] = Applicator.invoke(applicator, method, target, preTransform, ...args);
      copyMetaData(descriptor[decoratorTarget], preTransform);

      if (decoratorTarget === decorateTargets.SET || decoratorTarget === decorateTargets.GET) {
        getterSetterMap.set([target, name, decoratorTarget], descriptor[decoratorTarget]);
      }

      return descriptor;
    };
  }
}

export function createInstanceDecorator(method, applicator = applicators.pre) {
  const objectMap = new CompositeKeyWeakMap();
  const getterSetterMap = new CompositeKeyWeakMap();

  return applicator === applicators.single ? wrapper() : wrapper;

  function wrapper(...args) {
    return function decorator(target, name, descriptor) {
      const decoratorTarget = getDecoratorTarget(target, name, descriptor, getterSetterMap);
      const preTransform = descriptor[decoratorTarget];

      descriptor[decoratorTarget] = copyMetaData(partial(instanceDecoratorWrapper, preTransform), preTransform);

      if (decoratorTarget === decorateTargets.SET || decoratorTarget === decorateTargets.GET) {
        getterSetterMap.set([target, name, decoratorTarget], descriptor[decoratorTarget]);
      }

      return descriptor;

      function instanceDecoratorWrapper(toWrap, ...methodArgs) {
        if (!objectMap.has([this, toWrap])) {
          objectMap.set([this, toWrap], Applicator.invoke(applicator, method, this, toWrap, ...args));
        }

        const fn = objectMap.get([this, toWrap]);

        return fn.apply(this, methodArgs);
      }
    };
  }
}
