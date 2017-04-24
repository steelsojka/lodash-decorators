import { curryRight } from 'lodash';

import { DecoratorConfig, DecoratorFactory, LodashMethodDecorator } from './factory';
import { PreValueApplicator } from './applicators';

export const CurryRight: (arity?: number) => LodashMethodDecorator = DecoratorFactory.createInstanceDecorator(new DecoratorConfig(curryRight, PreValueApplicator, { bound: true }));
export { CurryRight as curryRight };
export default CurryRight;