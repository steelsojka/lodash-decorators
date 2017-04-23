import { DecoratorConfig, DecoratorFactory } from './factory';
import { PreValueApplicator } from './applicators';
import { returnAtIndex } from './utils';

/**
 * Returns the first argument from the function regardless of
 * the decorated functions return value.
 */
export const TapDecoratorConfig = new DecoratorConfig((fn: Function) => returnAtIndex(fn, 0), PreValueApplicator);
export const Tap = DecoratorFactory.createDecorator(TapDecoratorConfig)();
