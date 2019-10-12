import { DecoratorFactory, BiTypedMethodDecorator } from './factory';
import config from './configs/tap';

/**
 * Returns the first argument from the function regardless of
 * the decorated functions return value.
 */
export const Tap = DecoratorFactory.tc39.createDecorator(
  config
) as BiTypedMethodDecorator;
export { Tap as tap };
export default Tap;
