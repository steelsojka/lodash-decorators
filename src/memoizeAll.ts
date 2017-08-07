import { memoize } from 'lodash';

import { DecoratorConfig, DecoratorFactory, LodashMethodDecorator } from './factory';
import { MemoizeApplicator } from './applicators';
import { MemoizeConfig } from './shared';

const decorator = DecoratorFactory.createDecorator(
  new DecoratorConfig(memoize, new MemoizeApplicator())
);

/**
 * Memoizes a function on the prototype instead of the instance. All instances of the class use the same memoize cache.
 * @param {Function} [resolver] Optional resolver
 */
export function MemoizeAll(resolver?: Function | MemoizeConfig<any, any>): LodashMethodDecorator {
  return decorator(resolver);
}
export { MemoizeAll as memoizeAll };
export default decorator;
