import {
  forOwn,
  isFunction,
  partial,
  identity,
  values,
  assign,
  upperFirst,
  uniqueId
} from 'lodash';

import { Applicator } from '../applicators';
import { ApplicatorFactory } from './ApplicatorFactory';
import { ApplicatorToken, InstanceMethodMap } from './common';
import { log } from '../utils';

export type GenericDecorator = (...args: any[]) => MethodDecorator;

export interface DecoratorConfig {
  execute: Function;
  applicator: ApplicatorToken;
}

export class InternalDecoratorFactory {
  createDecorator(config: DecoratorConfig): GenericDecorator {
    const { execute, applicator:token } = config;
    const applicator = ApplicatorFactory.get(token);

    return (...args: any[]): MethodDecorator => {
      return (target: Object, name: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
        const { set, get, value } = descriptor;

        if (isFunction(value)) {
          descriptor.value = applicator.apply(execute, target, value, ...args);
        } else {
          if (set) {
            descriptor.set = applicator.apply(execute, target, set, ...args);
          }

          if (get) {
            descriptor.get = applicator.apply(execute, target, get, ...args);
          }
        }

        return descriptor;
      };
    };
  }

  createInstanceDecorator(config: DecoratorConfig): GenericDecorator {
    const { execute, applicator:token } = config;
    const applicator = ApplicatorFactory.get(token);

    return (...args: any[]): MethodDecorator => {
      return (target: Object, name: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
        const { set, get, value, writable, enumerable, configurable } = descriptor;
        const isFirstInstance = !InstanceMethodMap.has([ target, name ]);
        const fnChain = InstanceMethodMap.get([ target, name ]) || [];

        fnChain.push((fn: Function) => {
          return applicator.apply(execute, target, fn, ...args);
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
              value: fnChain.reduce((result: Function, fn: Function) => fn(result), value)
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
      };
    };
  }
}

export const DecoratorFactory = new InternalDecoratorFactory();
