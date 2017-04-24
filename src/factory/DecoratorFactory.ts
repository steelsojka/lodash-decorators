import { isFunction } from 'lodash';

import { ApplicatorFactory } from './ApplicatorFactory';
import { 
  InstanceChainMap, 
  LodashDecorator,
  ProtoInstanceMap,
  InstanceChainContext
} from './common';
import { DecoratorConfig } from './DecoratorConfig';
import { copyMetadata, bind } from '../utils';

export type GenericDecorator = (...args: any[]) => LodashDecorator;

export class InternalDecoratorFactory {
  createDecorator(config: DecoratorConfig): GenericDecorator {
    const { applicator:token } = config;
    const applicator = ApplicatorFactory.get(token);

    return (...args: any[]): LodashDecorator => {
      return (target: Object, name: string, _descriptor?: PropertyDescriptor): PropertyDescriptor => {
        const descriptor = this._resolveDescriptor(target, name, _descriptor);
        const { value, get, set } = descriptor;

        // If this decorator is being applied after an instance decorator we
        // need to create the applied method only once and add it to the
        // instance decorator chain so each instance uses the same decorated method
        // while leaving instance decorators to the instances.
        if (InstanceChainMap.has([ target, name ])) {
          const instanceChain = InstanceChainMap.get([ target, name ]);

          instanceChain.push((fn: Function, instance: any, context: InstanceChainContext) => {
            let protoFn = ProtoInstanceMap.get([ target, name ]);

            if (context.getter && !config.getter || context.setter && !config.setter) {
              return fn;
            }

            if (!protoFn) {
              protoFn = applicator.apply({ config, target, value: context.value, args });
              ProtoInstanceMap.set([ target, name ], protoFn);
            }

            return copyMetadata(function(...args: any[]): any {
              return protoFn.apply(this, fn.apply(this, args));
            }, fn);
          });

          // Don't change the descriptor since a getter/setter is set from an instance decorator.
          return descriptor;
        }

        if (isFunction(value)) {
          descriptor.value = copyMetadata(applicator.apply({ config, target, value, args }), value);
        } else if (isFunction(get) && config.getter) {
          descriptor.get = copyMetadata(applicator.apply({ config, target, value: get, args }), get);
        } else if (isFunction(set) && config.setter) {
          descriptor.set = copyMetadata(applicator.apply({ config, target, value: set, args }), get);
        }

        return descriptor;
      };
    };
  }

  createInstanceDecorator(config: DecoratorConfig): GenericDecorator {
    const { applicator:token, bound } = config;
    const applicator = ApplicatorFactory.get(token);

    return (...args: any[]): LodashDecorator => {
      return (target: Object, name: string, _descriptor?: PropertyDescriptor): PropertyDescriptor => {
        const descriptor = this._resolveDescriptor(target, name, _descriptor);
        const { value, writable, enumerable, configurable, get, set } = descriptor;
        const isFirstInstance = !InstanceChainMap.has([ target, name ]);
        const fnChain = InstanceChainMap.get([ target, name ]) || [];
        const isGetter = isFirstInstance && isFunction(get);
        const isSetter = isFirstInstance && isFunction(set);

        fnChain.push((fn: Function, instance: any, context: InstanceChainContext) => {
          if (context.getter && !config.getter || context.setter && !config.setter) {
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

        const applyDecorator = (instance: any) => {
          let getter = get || undefined;
          let setter = set || undefined;

          if (isGetter || isSetter) {
            // If we have a getter apply the decorators to the getter and assign it to the instance.
            if (isGetter) {
              getter = fnChain.reduce((result: Function, fn: Function) => fn(result, instance, { start: get, getter: true }), get);
            } 

            if (isSetter) {
              setter = fnChain.reduce((result: Function, fn: Function) => fn(result, instance, { start: set, setter: true }), set);
            } 

            Object.defineProperty(instance, name, {
              enumerable,
              configurable,
              get: getter,
              set: setter
            });
          } else {
            const newFn = fnChain.reduce((result: Function, fn: Function) => fn(result, instance, { start: value }), value);

            Object.defineProperty(instance, name, {
              writable,
              enumerable,
              configurable,
              value: newFn
            });
          }
        }

        if (isFunction(value)) {
          delete descriptor.value;
          delete descriptor.writable;
        }

        descriptor.get = function() {
          applyDecorator(this);

          const descriptor = Object.getOwnPropertyDescriptor(this, name);

          return descriptor.get ? descriptor.get.call(this) : descriptor.value;
        };

        descriptor.set = function(value) {
          applyDecorator(this);

          const descriptor = Object.getOwnPropertyDescriptor(this, name);

          if (descriptor.set) {
            descriptor.set.call(this, value);
          }
        };

        return descriptor;
      };
    };
  }

  private _resolveDescriptor(target: Object, name: string, descriptor?: PropertyDescriptor): PropertyDescriptor {
    if (descriptor) {
      return descriptor;
    }

    return Object.getOwnPropertyDescriptor(target, name);
  }
}

export const DecoratorFactory = new InternalDecoratorFactory();
