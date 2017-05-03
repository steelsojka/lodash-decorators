import overArgs = require('lodash/overArgs');

import { DecoratorConfig, DecoratorFactory, LodashMethodDecorator } from './factory';
import { PreValueApplicator } from './applicators';

export const OverArgs: (...transforms: Function[]) => LodashMethodDecorator = DecoratorFactory.createDecorator(
  new DecoratorConfig(overArgs, new PreValueApplicator(), { setter: true })
);
export { OverArgs as overArgs };
export default OverArgs;
