import { DecoratorFactory } from '../factory/DecoratorFactory';
import { Tc39DecoratorAdapter } from '../factory/Tc39DecoratorAdapter';

export const decoratorFactory = new DecoratorFactory(
  new Tc39DecoratorAdapter()
);
