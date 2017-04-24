import { isFunction, noop } from 'lodash';

import { ApplicatorFactory } from './ApplicatorFactory';
import { 
  InstanceChainMap, 
  LodashMethodDecorator,
  ProtoInstanceMap
} from './common';
import { DecoratorConfig } from './DecoratorConfig';
import { copyMetadata, bind } from '../utils';

export type GenericDecorator = (...args: any[]) => LodashMethodDecorator;

export class InternalDecoratorFactory {
  createDecorator(config: DecoratorConfig): GenericDecorator {
    const { applicator:token } = config;
    const applicator = ApplicatorFactory.get(token);

    return (...args: any[]): LodashMethodDecorator => {
      return (target: Object, name: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
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
              protoFn = applicator.apply({ config, target, value, args });
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
        }

        return descriptor;
      };
    };
  }

  createInstanceDecorator(config: DecoratorConfig): GenericDecorator {
    const { applicator:token, bound } = config;
    const applicator = ApplicatorFactory.get(token);

    return (...args: any[]): LodashMethodDecorator => {
      return (target: Object, name: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
        const { value, writable, enumerable, configurable } = descriptor;
        const isFirstInstance = !InstanceChainMap.has([ target, name ]);
        const fnChain = InstanceChainMap.get([ target, name ]) || [];

        fnChain.push((fn: Function, instance: any) => {
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

        if (isFunction(value)) {
          delete descriptor.value;
          delete descriptor.writable;

          descriptor.get = function() {
            const newFn = fnChain.reduce((result: Function, fn: Function) => fn(result, this), value);

            Object.defineProperty(this, name, {
              writable,
              enumerable,
              configurable,
              value: newFn
            });

            return newFn;
          };

          descriptor.set = noop;
        }

        return descriptor;
      };
    };
  }
}

export const DecoratorFactory = new InternalDecoratorFactory();
