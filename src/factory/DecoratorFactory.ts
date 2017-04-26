import { isFunction } from 'lodash';

import { 
  InstanceChainMap, 
  LodashDecorator,
  InstanceChainContext
} from './common';
import { DecoratorConfig } from './DecoratorConfig';
import { copyMetadata, bind } from '../utils';

export type GenericDecorator = (...args: any[]) => LodashDecorator;

export class InternalDecoratorFactory {
  createDecorator(config: DecoratorConfig): GenericDecorator {
    const { applicator } = config;

    return (...args: any[]): LodashDecorator => {
      return (target: Object, name: string, _descriptor?: PropertyDescriptor): PropertyDescriptor => {
        const descriptor = this._resolveDescriptor(target, name, _descriptor);
        const { value, get, set } = descriptor;

        // If this decorator is being applied after an instance decorator we simply ignore it
        // as we can't apply it correctly.
        if (!InstanceChainMap.has([ target, name ])) {
          if (isFunction(value)) {
            descriptor.value = copyMetadata(applicator.apply({ config, target, value, args }), value);
          } else if (isFunction(get) && config.getter) {
            descriptor.get = copyMetadata(applicator.apply({ config, target, value: get, args }), get);
          } else if (isFunction(set) && config.setter) {
            descriptor.set = copyMetadata(applicator.apply({ config, target, value: set, args }), get);
          }
        }

        return descriptor;
      };
    };
  }

  createInstanceDecorator(config: DecoratorConfig): GenericDecorator {
    const { applicator, bound } = config;

    return (...args: any[]): LodashDecorator => {
      return (target: Object, name: string, _descriptor?: PropertyDescriptor): PropertyDescriptor => {
        const descriptor = this._resolveDescriptor(target, name, _descriptor);
        const { value, writable, enumerable, configurable, get, set } = descriptor;
        const isFirstInstance = !InstanceChainMap.has([ target, name ]);
        const fnChain = InstanceChainMap.get([ target, name ]) || [];
        const isGetter = isFirstInstance && isFunction(get);
        const isSetter = isFirstInstance && isFunction(set);
        const isMethod = isFirstInstance && isFunction(value);
        const isProperty = isFirstInstance && !isGetter && !isSetter && !isMethod;

        fnChain.push((fn: Function, instance: any, context: InstanceChainContext) => {
          if (!this._isApplicable(context, config)) {
            return fn;
          }

          if (bound) {
            fn = bind(fn, instance);
          }

          return copyMetadata(
            applicator.apply({ args, target, instance, value: fn, config }), 
            fn
          );
        });

        InstanceChainMap.set([ target, name ], fnChain);

        if (!isFirstInstance) {
          return descriptor;
        }

        const applyChain = (fn: any, context: InstanceChainContext, instance: any) => {
          return fnChain.reduce((result: Function, next: Function) => next(result, instance, context), fn);
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
          applyDecorator(this);

          const descriptor = Object.getOwnPropertyDescriptor(this, name);

          if (descriptor.get) {
            return descriptor.get.call(this);
          }

          return descriptor.value;
        };

        descriptor.set = function(value) {
          applyDecorator(this);

          const descriptor = Object.getOwnPropertyDescriptor(this, name);

          if (descriptor.set) {
            descriptor.set.call(this, value);
          } else if (isProperty || isMethod) {
            this[name] = value;
          }
        };

        return descriptor;
      };
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
