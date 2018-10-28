import { DecoratorFactory } from '../factory/DecoratorFactory';
import { LegacyDecoratorAdapter } from '../factory/LegacyDecoratorAdapter';

export const legacyDecoratorFactory = new DecoratorFactory(
  new LegacyDecoratorAdapter()
);
