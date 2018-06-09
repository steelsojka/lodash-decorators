import isFunction = require('lodash/isFunction');

import {
  InstanceChainMap,
  LodashDecorator,
  InstanceChainContext
} from './common';
import { DecoratorConfig } from './DecoratorConfig';
import {
  copyMetadata,
  bind,
  isMethodOrPropertyDecoratorArgs,
  isPrototypeAccess
} from '../utils';

export type GenericDecorator = (...args: any[]) => LodashDecorator;

export class InternalDecoratorFactory {
  createDecorator(config: DecoratorConfig): GenericDecorator {
    const { applicator, optionalParams } = config;

    return (...args: any[]): LodashDecorator => {
      let params = args;

      const decorator = (target: Object, name: string, _descriptor?: PropertyDescriptor): PropertyDescriptor => {
        const descriptor = this._resolveDescriptor(target, name, _descriptor);
        const { value, get, set } = descriptor;

        // If this decorator is being applied after an instance decorator we simply ignore it
        // as we can't apply it correctly.
        if (!InstanceChainMap.has([ target, name ])) {
          if (isFunction(value)) {
            descriptor.value = copyMetadata(applicator.apply({ config, target, value, args: params }), value);
          } else if (isFunction(get) && config.getter) {
            descriptor.get = copyMetadata(applicator.apply({ config, target, value: get, args: params }), get);
          } else if (isFunction(set) && config.setter) {
            descriptor.set = copyMetadata(applicator.apply({ config, target, value: set, args: params }), set);
          }
        }

        return descriptor;
      };

      if (optionalParams && isMethodOrPropertyDecoratorArgs(...args)) {
        params = [];

        return decorator(args[0], args[1], args[2]) as any;
      }

      return decorator;
    };
  }

  createInstanceDecorator(config: DecoratorConfig): GenericDecorator {
    const { applicator, bound, optionalParams } = config;

    return (...args: any[]): LodashDecorator => {
      let params = args;
      const decorator = (target: Object, name: string, _descriptor?: PropertyDescriptor): PropertyDescriptor => {
        const descriptor = this._resolveDescriptor(target, name, _descriptor);
        const { value, writable, enumerable, configurable, get, set } = descriptor;
        const isFirstInstance = !InstanceChainMap.has([ target, name ]);
        const chainData = InstanceChainMap.get([ target, name ]) || { fns: [], properties: [] };
        const isGetter = isFirstInstance && isFunction(get);
        const isSetter = isFirstInstance && isFunction(set);
        const isMethod = isFirstInstance && isFunction(value);
        const isProperty = isFirstInstance && !isGetter && !isSetter && !isMethod;
        const baseValue = isGetter ? get : isMethod ? value : undefined;

        chainData.properties.push(name);
        chainData.fns.push((fn: Function, instance: any, context: InstanceChainContext) => {
          if (!this._isApplicable(context, config)) {
            return fn;
          }

          if (bound) {
            fn = bind(fn, instance);
          }

          return copyMetadata(
            applicator.apply({ args: params, target, instance, value: fn, config }),
            fn
          );
        });

        InstanceChainMap.set([ target, name ], chainData);

        if (!isFirstInstance) {
          return descriptor;
        }

        chainData.isSetter = isSetter;
        chainData.isGetter = isGetter;
        chainData.isMethod = isMethod;
        chainData.isProperty = isProperty;

        const applyChain = (fn: any, context: InstanceChainContext, instance: any) => {
          return chainData.fns.reduce((result: Function, next: Function) => next(result, instance, context), fn);
        };

        const applyDecorator = (instance: any) => {
          let getter = get || undefined;
          let setter = set || undefined;

          if (isGetter || isSetter) {
            // If we have a getter apply the decorators to the getter and assign it to the instance.
            if (isGetter) {
              getter = applyChain(get, { value: get, getter: true }, instance);
            }

            if (isSetter) {
              setter = applyChain(set, { value: set, setter: true }, instance);
            }

            Object.defineProperty(instance, name, {
              enumerable,
              configurable,
              get: getter,
              set: setter
            });
          } else if (isMethod || isProperty) {
            const newFn = isMethod
              ? applyChain(value, { value, method: true }, instance)
              : applyChain(value, { value, property: true }, instance);

            Object.defineProperty(instance, name, {
              writable,
              enumerable,
              configurable,
              value: newFn
            });
          }
        }

        if (isMethod || isProperty) {
          delete descriptor.value;
          delete descriptor.writable;
        }

        descriptor.get = function() {
          // Check for direct access on the prototype.
          // MyClass.prototype.fn <-- This should not apply the decorator.
          if (isPrototypeAccess(this, target)) {
            return baseValue;
          }

          applyDecorator(this);

          const descriptor = Object.getOwnPropertyDescriptor(this, name)!;

          if (descriptor.get) {
            return descriptor.get.call(this);
          }

          return descriptor.value;
        };

        descriptor.set = function(value) {
          applyDecorator(this);

          const descriptor = Object.getOwnPropertyDescriptor(this, name)!;

          if (descriptor.set) {
            descriptor.set.call(this, value);
          } else if (isProperty || isMethod) {
            this[name] = value;
          }
        };

        return descriptor;
      };

      if (optionalParams && isMethodOrPropertyDecoratorArgs(...args)) {
        params = [];

        return decorator(args[0], args[1], args[2]) as any;
      }

      return decorator;
    };
  }

  private _isApplicable(context: InstanceChainContext, config: DecoratorConfig): boolean {
   return !Boolean(
     context.getter && !config.getter
      || context.setter && !config.setter
      || context.method && !config.method
      || context.property && !config.property
   );
  }

  private _resolveDescriptor(target: Object, name: string, descriptor?: PropertyDescriptor): PropertyDescriptor {
    if (descriptor) {
      return descriptor;
    }

    return Object.getOwnPropertyDescriptor(target, name) || {};
  }
}

export const DecoratorFactory = new InternalDecoratorFactory();
