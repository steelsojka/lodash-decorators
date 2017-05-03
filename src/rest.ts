import rest = require('lodash/rest');

import { DecoratorConfig, DecoratorFactory, LodashMethodDecorator } from './factory';
import { PreValueApplicator } from './applicators';

export const Rest: (start?: number) => LodashMethodDecorator = DecoratorFactory.createDecorator(
  new DecoratorConfig(rest, new PreValueApplicator())
);
export { Rest as rest };
export default Rest;
