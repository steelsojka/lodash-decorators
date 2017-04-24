import { memoize } from 'lodash';

import { DecoratorConfig, DecoratorFactory, LodashMethodDecorator } from './factory';
import { PreValueApplicator } from './applicators';

/**
 * Memoizes a function on the prototype instead of the instance. All instances of the class use the same memoize cache.
 * @param {Function} [resolver] Optional resolver
 */
export const MemoizeAll: (resolver?: Function) => LodashMethodDecorator = DecoratorFactory.createDecorator(new DecoratorConfig(memoize, PreValueApplicator));
export { MemoizeAll as memoizeAll };
export default MemoizeAll;