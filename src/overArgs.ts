import overArgs = require('lodash/overArgs');

import { DecoratorConfig, DecoratorFactory, LodashMethodDecorator } from './factory';
import { PreValueApplicator } from './applicators';

export function OverArgs(...transforms: Function[]): LodashMethodDecorator {
  return DecoratorFactory.createDecorator(
    new DecoratorConfig(overArgs, new PreValueApplicator(), { setter: true })
  )(...transforms);
}
export { OverArgs as overArgs };
export default OverArgs;
