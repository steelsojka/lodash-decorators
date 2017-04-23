import { isFunction } from 'lodash';

import { ApplicatorFactory } from './ApplicatorFactory';
import { InstanceMethodMap, LodashDecorator } from './common';
import { DecoratorConfig } from './DecoratorConfig';

export type GenericDecorator = (...args: any[]) => LodashDecorator;

export class InternalDecoratorFactory {
  createDecorator(config: DecoratorConfig): GenericDecorator {
    const { execute, applicator:token } = config;
    const applicator = ApplicatorFactory.get(token);

    return (...args: any[]): LodashDecorator => {
      return (target: Object, name: string, _descriptor?: PropertyDescriptor): PropertyDescriptor => {
        const isTSProperty = !_descriptor;
        const descriptor = this._resolveDescriptor(target, name, _descriptor);
        const { set, get, value } = descriptor;

        if (isFunction(value)) {
          descriptor.value = applicator.apply({ fn: execute, target, value, args });
        } else {
          if (set) {
            descriptor.set = applicator.apply({ fn: execute, target, value: set, args });
          }

          if (get) {
            descriptor.get = applicator.apply({ fn: execute, target, value: get, args });
          }
        }

        if (isTSProperty) {
          Object.defineProperty(target, name, descriptor);
        }

        return descriptor;
      };
    };
  }

  createInstanceDecorator(config: DecoratorConfig): GenericDecorator {
    const { execute, applicator:token } = config;
    const applicator = ApplicatorFactory.get(token);

    return (...args: any[]): LodashDecorator => {
      return (target: Object, name: string, _descriptor?: PropertyDescriptor): PropertyDescriptor => {
        const isTSProperty = !_descriptor;
        const descriptor = this._resolveDescriptor(target, name, _descriptor);
        const { set, get, value, writable, enumerable, configurable } = descriptor;
        const isFirstInstance = !InstanceMethodMap.has([ target, name ]);
        const fnChain = InstanceMethodMap.get([ target, name ]) || [];

        fnChain.push((fn: Function, instance: any) => {
          return applicator.apply({
            args, target, instance, 
            value: fn,
            fn: execute
          });
        });

        InstanceMethodMap.set([ target, name ], fnChain);

        if (!isFirstInstance) {
          return descriptor;
        }

        if (isFunction(value)) {
          delete descriptor.value;
          delete descriptor.writable;

          descriptor.get = function() {
            Object.defineProperty(this, name, {
              writable,
              enumerable,
              configurable,
              value: fnChain.reduce((result: Function, fn: Function) => fn(result, this), value)
            });
          };

          descriptor.set = function(_value) {
            Object.defineProperty(this, name, {
              writable,
              enumerable,
              configurable,
              value: _value
            });
          };
        }

        if (isTSProperty) {
          Object.defineProperty(target, name, descriptor);
        }

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
