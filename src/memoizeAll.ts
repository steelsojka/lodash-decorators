import memoize = require('lodash/memoize');

import { DecoratorConfig, DecoratorFactory, BiTypedMethodDecorator1 } from './factory';
import { MemoizeApplicator } from './applicators';
import { MemoizeConfig } from './shared';

/**
 * Memoizes a function on the prototype instead of the instance. All instances of the class use the same memoize cache.
 * @param {Function} [resolver] Optional resolver
 */
export const MemoizeAll = DecoratorFactory.createDecorator(
  new DecoratorConfig(memoize, new MemoizeApplicator(), { optionalParams: true })
) as BiTypedMethodDecorator1<Function | MemoizeConfig<any, any>>;
export { MemoizeAll as memoizeAll };
export default MemoizeAll;
