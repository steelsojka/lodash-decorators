import { isFunction, noop } from 'lodash';

import { ApplicatorFactory } from './ApplicatorFactory';
import { 
  InstanceChainMap, 
  LodashMethodDecorator,
  ProtoInstanceMap
} from './common';
import { DecoratorConfig } from './DecoratorConfig';
import { copyMetadata } from '../utils';

export type GenericDecorator = (...args: any[]) => LodashMethodDecorator;

export class InternalDecoratorFactory {
  createDecorator(config: DecoratorConfig): GenericDecorator {
    const { execute, applicator:token } = config;
    const applicator = ApplicatorFactory.get(token);

    return (...args: any[]): LodashMethodDecorator => {
      return (target: Object, name: string, _descriptor?: PropertyDescriptor): PropertyDescriptor => {
        const isTSProperty = !_descriptor;
        const descriptor = this._resolveDescriptor(target, name, _descriptor);
        const { value = noop } = descriptor;

        // If this decorator is being applied after an instance decorator we
        // need to create the applied method only once and add it to the
        // instance decorator chain so each instance uses the same decorated method
        // while leaving instance decorators to the instances.
        if (InstanceChainMap.has([ target, name ])) {
          const instanceChain = InstanceChainMap.get([ target, name ]);

          instanceChain.push((fn: Function, instance: any) => {
            let protoFn = ProtoInstanceMap.get([ target, name ]);

            if (!protoFn) {
              protoFn = applicator.apply({ fn: execute, target, value, args });
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
          descriptor.value = copyMetadata(applicator.apply({ fn: execute, target, value, args }), value);
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

    return (...args: any[]): LodashMethodDecorator => {
      return (target: Object, name: string, _descriptor?: PropertyDescriptor): PropertyDescriptor => {
        const isTSProperty = !_descriptor;
        const descriptor = this._resolveDescriptor(target, name, _descriptor);
        const { value, writable, enumerable, configurable } = descriptor;
        const isFirstInstance = !InstanceChainMap.has([ target, name ]);
        const fnChain = InstanceChainMap.get([ target, name ]) || [];

        fnChain.push((fn: Function, instance: any) => {
          return copyMetadata(
            applicator.apply({ args, target, instance, value: fn, fn: execute }), 
            fn
          );
        });

        InstanceChainMap.set([ target, name ], fnChain);

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

          descriptor.set = noop;

          if (isTSProperty) {
            Object.defineProperty(target, name, descriptor);
          }
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
