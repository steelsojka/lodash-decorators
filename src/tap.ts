import { DecoratorConfig, DecoratorFactory, LodashMethodDecorator } from './factory/index';
import { PreValueApplicator } from './applicators/index';
import { returnAtIndex } from './utils';

const decorator = DecoratorFactory.createDecorator(
  new DecoratorConfig((fn: Function) => returnAtIndex(fn, 0), new PreValueApplicator())
);

/**
 * Returns the first argument from the function regardless of
 * the decorated functions return value.
 */
export function Tap(): LodashMethodDecorator {
  return decorator();
}
export { Tap as tap };
export default decorator;
