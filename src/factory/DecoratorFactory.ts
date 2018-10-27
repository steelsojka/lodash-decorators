import {
  LodashDecorator,
  InstanceChainContext
} from './common';
import { DecoratorConfig } from './DecoratorConfig';
import { AbstractDecoratorAdapter } from './AbstractDecoratorAdapter';
import { LegacyDecoratorAdapter } from './LegacyDecoratorAdapter';

export type GenericDecorator = (...args: any[]) => LodashDecorator;

export class InternalDecoratorFactory {
  private adapter: AbstractDecoratorAdapter = new LegacyDecoratorAdapter();

  createDecorator(config: DecoratorConfig): GenericDecorator {
    const { optionalParams } = config;

    return (...args: any[]): LodashDecorator => {
      let params = args;
      const adapter = this.adapter;

      const decorator = (...decoratorArgs: any[]): PropertyDescriptor => {
        return adapter.createDecorator(config, params, decoratorArgs);
      };

      if (optionalParams && adapter.isDecoratorArgs(args)) {
        params = [];

        return decorator(...args) as any;
      }

      return decorator;
    };
  }

  createInstanceDecorator(config: DecoratorConfig): GenericDecorator {
    const { optionalParams } = config;

    return (...args: any[]): LodashDecorator => {
      let params = args;
      const adapter = this.adapter;

      const decorator = (...decoratorArgs: any[]): PropertyDescriptor => {
        return adapter.createInstanceDecorator(config, params, decoratorArgs);
      };

      if (optionalParams && adapter.isDecoratorArgs(args)) {
        params = [];

        return decorator(...args) as any;
      }

      return decorator;
    };
  }
}

export function isApplicable(context: InstanceChainContext, config: DecoratorConfig): boolean {
  return !Boolean(
    context.getter && !config.getter
    || context.setter && !config.setter
    || context.method && !config.method
    || context.property && !config.property
  );
}

export function resolveDescriptor(target: Object, name: string, descriptor?: PropertyDescriptor): PropertyDescriptor {
  if (descriptor) {
    return descriptor;
  }

  return Object.getOwnPropertyDescriptor(target, name) || {};
}

export const DecoratorFactory = new InternalDecoratorFactory();
