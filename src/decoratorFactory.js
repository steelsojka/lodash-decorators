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

/**
 * Gets a decorators target type.
 *
 * @param {Object} target The decorator target.
 * @param {String} name The property name.
 * @param {Object} descriptor The property descriptor.
 * @param {CompositeKeyWeakMap} getterSetterMap The getter/setter map
 *   for the decorator. This is needed to check whether the getter or setter
 *   has been set.
 * @returns {String} A decorator target type.
 */
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

/**
 * Creates a decorator that uses an applicator to wrap a transform function.
 *
 * @param {Function} method The method that will __wrap__ the function being decorated.
 * @param {Function} [applicator=applicators.pre] The applicator function to apply the __method__ with.
 * @returns {Function} The decorator function or decorator wrapper function.
 */
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

/**
 * Creates an instance decorator that uses an applicator to wrap a transform function.
 * This has different behaviour than a decorator that is applied to a class as a whole.
 *
 * This uses a WeakMap to keep track of instances and methods.
 *
 * @param {Function} method The method that will __wrap__ the function being decorated.
 * @param {Function} [applicator=applicators.pre] The applicator function to apply the __method__ with.
 * @returns {Function} The decorator function or decorator wrapper function.
 */
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
