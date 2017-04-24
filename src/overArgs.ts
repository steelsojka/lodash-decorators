import { overArgs } from 'lodash';

import { DecoratorConfig, DecoratorFactory, LodashMethodDecorator } from './factory';
import { PreValueApplicator } from './applicators';

export const OverArgs: (...transforms: Function[]) => LodashMethodDecorator = DecoratorFactory.createDecorator(new DecoratorConfig(overArgs, PreValueApplicator));
export { OverArgs as overArgs };
export default OverArgs;