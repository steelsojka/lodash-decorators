import { DecoratorFactory, BiTypedMethodDecorator1 } from './factory';
import { MemoizeConfig } from './shared';
import config from '../configs/memoizeAll';

/**
 * Memoizes a function on the prototype instead of the instance. All instances of the class use the same memoize cache.
 * @param {Function} [resolver] Optional resolver
 */
export const MemoizeAll = DecoratorFactory.legacy.createDecorator(
  config
) as BiTypedMethodDecorator1<Function | MemoizeConfig<any, any>>;
export { MemoizeAll as memoizeAll };
export default MemoizeAll;
