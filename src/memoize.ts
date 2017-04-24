import { memoize } from 'lodash';

import { DecoratorConfig, DecoratorFactory, LodashMethodDecorator } from './factory';
import { PreValueApplicator } from './applicators';

export const Memoize: (resolver?: Function) => LodashMethodDecorator = DecoratorFactory.createInstanceDecorator(new DecoratorConfig(memoize, PreValueApplicator));
export { Memoize as memoize };
export default Memoize;