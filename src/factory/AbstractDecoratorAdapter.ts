import { DecoratorConfig } from './DecoratorConfig';

export abstract class AbstractDecoratorAdapter {
  abstract createDecorator(config: DecoratorConfig, params: any[], decoratorArgs: any[]): any;
  abstract createInstanceDecorator(config: DecoratorConfig, params: any[], decoratorArgs: any[]): any;
  abstract isDecoratorArgs(args: any[]): boolean;
}
