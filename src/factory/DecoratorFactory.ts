import { InstanceChainContext } from './common';
import { DecoratorConfig } from './DecoratorConfig';
import { AbstractDecoratorAdapter } from './AbstractDecoratorAdapter';

export type GenericDecorator<T extends (...args: any[]) => any> = (...args: any[]) => T;

export class DecoratorFactory {
  constructor(private adapter: AbstractDecoratorAdapter) {}

  createDecorator<T extends (...args: any[]) => any>(config: DecoratorConfig): GenericDecorator<T> {
    const { optionalParams } = config;

    return (...args: any[]): T => {
      let params = args;

      const decorator = (...decoratorArgs: any[]): any => {
        return this.adapter.createDecorator(config, params, decoratorArgs);
      };

      if (optionalParams && this.adapter.isDecoratorArgs(args)) {
        params = [];

        return decorator(...args) as ReturnType<T>;
      }

      return decorator as T;
    };
  }

  createInstanceDecorator<T extends (...args: any) => any>(config: DecoratorConfig): GenericDecorator<T> {
    const { optionalParams } = config;

    return (...args: any[]): T => {
      let params = args;

      const decorator = (...decoratorArgs: any[]): PropertyDescriptor => {
        return this.adapter.createInstanceDecorator(config, params, decoratorArgs);
      };

      if (optionalParams && this.adapter.isDecoratorArgs(args)) {
        params = [];

        return decorator(...args) as ReturnType<T>;
      }

      return decorator as T;
    };
  }

  /**
   * Sets the adapter to use for creating decorator.
   * @param {AbstractDecoratorAdapter} adapter
   */
  useAdapter(adapter: AbstractDecoratorAdapter): void {
    this.adapter = adapter;
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
