import { DecoratorConfig, DecoratorFactory, BiTypedMethodDecorator } from './factory';
import { PreValueApplicator } from './applicators';
import { returnAtIndex } from './utils';

/**
 * Returns the first argument from the function regardless of
 * the decorated functions return value.
 */
export const Tap = DecoratorFactory.createDecorator(
  new DecoratorConfig((fn: Function) => returnAtIndex(fn, 0), new PreValueApplicator(), { optionalParams: true })
) as BiTypedMethodDecorator;
export { Tap as tap };
export default Tap;
