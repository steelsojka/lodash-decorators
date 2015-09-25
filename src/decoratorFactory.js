import forOwn from 'lodash/object/forOwn';
import isFunction from 'lodash/lang/isFunction';
import partial from 'lodash/function/partial';
import identity from 'lodash/utility/identity';
import values from 'lodash/object/values';
import assign from 'lodash/object/assign';

import bindMap from './bind/bindMap';
import CompositeKeyWeakMap from './utils/CompositeKeyWeakMap';
import copyMetaData from './utils/copyMetaData';
import Applicator from './Applicator';
import log from './utils/log';
import normalizeExport from './utils/normalizeExport';

const { applicators } = Applicator;
const instanceMethodMap = new CompositeKeyWeakMap();

export const decoratorTargets = {
  GET: 'get',
  SET: 'set',
  VALUE: 'value',
  INITIALIZER: 'initializer'
};

export const decoratorTargetSet = new Set(values(decoratorTargets));

/**
 * Gets a decorators target type.
 *
 * @param {Object} target The decorator target.
 * @param {String} name The property name.
 * @param {Object} descriptor The property descriptor.
 * @returns {String} A decorator target type.
 */
export function getDecoratorTarget(target, name, descriptor) {
  if (descriptor.get) {
    return decoratorTargets.GET;
  } else if (descriptor.set) {
    return decoratorTargets.SET;
  } else if (descriptor.value) {
    return decoratorTargets.VALUE;
  } else if (descriptor.initializer) {
    return decoratorTargets.INITIALIZER;
  }

  throw new ReferenceError(log('Invalid decorator target.'));
}

export const createDecorator = createDecoratorFactory(
  createDecoratorApplicator(getDecoratorTarget),
  partial(wrapDecoratorWithAccessors, false)
);

export const createGetterDecorator = createDecoratorFactory(
  createDecoratorApplicator(decoratorTargets.GET)
);

export const createSetterDecorator = createDecoratorFactory(
  createDecoratorApplicator(decoratorTargets.SET)
);

export const createInstanceDecorator = createDecoratorFactory(
  createInstanceDecoratorApplicator(getDecoratorTarget),
  partial(wrapDecoratorWithAccessors, true),
  true
);

export const createInstanceSetterDecorator = createDecoratorFactory(
  createInstanceDecoratorApplicator(decoratorTargets.SET),
  identity,
  true
);

export const createInstanceGetterDecorator = createDecoratorFactory(
  createInstanceDecoratorApplicator(decoratorTargets.GET),
  identity,
  true
);

function throwInstanceError() {
  // Instance decorators need to be processed last in the chain, proceding prototype decorators.
  // Any prototype decorator processed after an instance decorator will get the getter proxy
  // instead of the function
  throw new Error(log('Instance decorators need to come after prototype decorators!'));
}

function resolveTargetName(targetName, ...args) {
  return isFunction(targetName) ? targetName(...args) : targetName;
}

function createDecoratorApplicator(forcedTargetName) {
  return function decoratorApplicator(target, name, descriptor, method, applicator, instanceMap, ...args) {
    let targetName = resolveTargetName(forcedTargetName, target, name, descriptor);

    if (instanceMethodMap.has([target, name])) {
      throwInstanceError();
    }

    if (decoratorTargetSet.has(targetName)) {
      const targetMethod = descriptor[targetName];

      descriptor[targetName] = Applicator.invoke(applicator, method, target, targetMethod, ...args);
      copyMetaData(descriptor[targetName], targetMethod);
    }

    return descriptor;
  };
}

function createInstanceDecoratorApplicator(forcedTargetName) {
  return function instanceDecoratorApplicator(target, name, descriptor, method, applicator, instanceMap, ...args) {
    let targetName = resolveTargetName(forcedTargetName, target, name, descriptor);
    let targetMethod = descriptor[targetName];
    let methodMapKey = [target, name];
    let hasInstanceMap = instanceMethodMap.has(methodMapKey);

    // Used as a unique symbol for this decorator/method combination.
    // We can then tell where this decorator is in the chain.
    let token = Symbol();

    switch (targetName) {
      // We are assuming at this point this is a method being decorated and not a getter or setter.
      case decoratorTargets.VALUE:
        if (!hasInstanceMap) {
          instanceMethodMap.set(methodMapKey, [token]);
          hasInstanceMap = true;
        }

        delete descriptor.value;
        delete descriptor.writable;
        descriptor.get = createGetterProxy();
        descriptor.set = createBaseValueSetter(descriptor);
        break;
      case decoratorTargets.GET:
        if (hasInstanceMap) {
          instanceMethodMap.get(methodMapKey).unshift(token);
        }

        descriptor.get = createGetterProxy();

        // If there is no setter create one to avoid errors
        if (!descriptor.set) {
          descriptor.set = identity;
        }

        break;
      case decoratorTargets.SET:
        descriptor.set = createSetterProxy();

        if (!descriptor.get) {
          descriptor.get = identity;
        }

        break;
    }

    return descriptor;

    // If the user assigns a value to a method with a instance decorator,
    // the value for the decorator will be overwritten. You will loose the
    // decorator chain, which would be the expected behaviour.
    function createBaseValueSetter({enumerable, writable, configurable}) {
      return function baseValueSetter(value) {
        Object.defineProperty(this, name, {
          value,
          configurable,
          writable,
          enumerable
        });
      };
    }

    function createSetterProxy() {
      return copyMetaData(function instanceSetterProxy(value) {
        const keys = [this, decoratorTargets.SET, targetMethod];

        if (!instanceMap.has(keys)) {
          instanceMap.set(keys, Applicator.invoke(applicator, method, this, targetMethod, ...args));
        }

        const setter = instanceMap.get(keys);

        return setter.call(this, value);
      });
    }

    // A proxy that gets the instances wrapped function and either returns it
    // or executes it. If the decorator is the first in the chain to execute
    // and was applied to a method and not a getter, then it will return the
    // function and all subsequent functions will execute.
    function createGetterProxy() {
      return copyMetaData(instanceGetterProxy, targetMethod);

      function instanceGetterProxy() {
        const keys = [this, decoratorTargets.GET, targetMethod];
        let invoke = true;

        if (hasInstanceMap) {
          invoke = instanceMethodMap.get(methodMapKey).indexOf(token) !== 0;
        }

        if (!instanceMap.has(keys)) {
          instanceMap.set(keys, Applicator.invoke(applicator, method, this, targetMethod, ...args));
        }

        const fn = instanceMap.get(keys);

        return invoke ? fn.apply(this, arguments) : bindMap.has([this, name]) ? copyMetaData(fn.bind(this), fn) : fn;
      }
    }
  };
}

function createDecoratorFactory(executeFn, modifierFn = identity, createInstanceMap = false) {
  return function createDecorator(method, applicator = applicators.pre) {
    let instanceMap = createInstanceMap ? new CompositeKeyWeakMap() : null;
    let decorator = applicator === applicators.single ? wrapper() : wrapper;

    return modifierFn(decorator, method, applicator);

    function wrapper(...args) {
      return function decorator(target, name, descriptor) {
        return executeFn(target, name, descriptor, method, applicator, instanceMap, ...args);
      };
    }
  };
}

function wrapDecoratorWithAccessors(instance, decorator, method, applicator, ...args) {
  // For an instance decorator provide a way to apply to the proto instead of instance and vice-versa
  let accessors = {
    get: instance ? createInstanceGetterDecorator(method, applicator) : createGetterDecorator(method, applicator),
    set: instance ? createInstanceSetterDecorator(method, applicator) : createSetterDecorator(method, applicator),
    proto: instance ? createDecorator(method, applicator) : decorator
  };

  return assign(decorator, normalizeExport(accessors));
}
