import isFunction = require('lodash/isFunction');

import { AbstractDecoratorAdapter } from './AbstractDecoratorAdapter';
import { DecoratorConfig } from './DecoratorConfig';
import {
  Tc39ClassDecoratorMetadata,
  Tc39FieldDecoratorMetadata,
  Tc39MethodDecoratorMetadata
} from '../tc39';
import { copyMetadata } from '../utils';

export class Tc39DecoratorAdapter extends AbstractDecoratorAdapter {
  createDecorator(
    config: DecoratorConfig,
    params: any[],
    decoratorArgs: [ Tc39ClassDecoratorMetadata | Tc39FieldDecoratorMetadata | Tc39MethodDecoratorMetadata ]
  ): Tc39FieldDecoratorMetadata | Tc39ClassDecoratorMetadata | Tc39MethodDecoratorMetadata {
    const { applicator } = config;
    const [ metadata ] = decoratorArgs;

    if (metadata.kind === 'field' || metadata.kind === 'method') {
      const descriptor = metadata.descriptor;
      // Note, the new spec no longer provides the prototype with
      // the decorator. This means some decorators will not work correctly
      // and will have to have some features deprecated under the new spec.
      // Basically, other function lookups like partial with a string argument.
      // This makes me a sad panda...
      const target = undefined;
      let value: any;
      let key: 'get' | 'set' | 'value' = 'value';

      if (isFunction(descriptor.value)) {
        value = descriptor.value;
        key = 'value';
      } else if (isFunction(descriptor.get) && config.getter) {
        value = descriptor.get;
        key = 'get';
      } else if (isFunction(descriptor.set) && config.setter) {
        value = descriptor.set;
        key = 'set';
      }

      return {
        ...metadata,
        descriptor: {
          ...descriptor,
          [key]: copyMetadata(
            applicator.apply({ config, target, value, args: params }), value)
        }
      };
    } else {
      return metadata as Tc39ClassDecoratorMetadata;
    }
  }

  createInstanceDecorator(
    config: DecoratorConfig,
    params: any[],
    decoratorArgs: [ Tc39ClassDecoratorMetadata | Tc39FieldDecoratorMetadata | Tc39MethodDecoratorMetadata ]
  ): Tc39FieldDecoratorMetadata | Tc39ClassDecoratorMetadata | Tc39MethodDecoratorMetadata {
    return this.createDecorator(config, params, decoratorArgs);
  }

  isDecoratorArgs(args: any[]): boolean {
    return args.length === 1
      && ((args[0].kind === 'class' && Array.isArray(args[0].elements))
        || (args[0].kind === 'field' && this.isFieldOrMethodMetadata(args[0]))
        || (args[0].kind === 'method' && this.isFieldOrMethodMetadata(args[0])));
  }

  private isFieldOrMethodMetadata(arg: object): boolean {
    return arg.hasOwnProperty('placement')
      && arg.hasOwnProperty('key')
      && arg.hasOwnProperty('descriptor');
  }
}
