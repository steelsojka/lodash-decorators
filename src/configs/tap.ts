import { DecoratorConfig } from '../factory';
import { PreValueApplicator } from '../applicators';
import { returnAtIndex } from '../utils/returnAtIndex';

/**
 * Returns the first argument from the function regardless of
 * the decorated functions return value.
 */
export default new DecoratorConfig(
  (fn: Function) => returnAtIndex(fn, 0),
  new PreValueApplicator(),
  { optionalParams: true }
);
