import rest = require('lodash/rest');

import { DecoratorConfig, DecoratorFactory, LodashMethodDecorator } from './factory';
import { PreValueApplicator } from './applicators';

export function Rest(start?: number): LodashMethodDecorator {
  return DecoratorFactory.createDecorator(
    new DecoratorConfig(rest, new PreValueApplicator())
  )(start);
}
export { Rest as rest };
export default Rest;
