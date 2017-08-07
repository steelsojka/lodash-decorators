import overArgs = require('lodash/overArgs');

import { DecoratorConfig, DecoratorFactory, LodashMethodDecorator } from './factory';
import { PreValueApplicator } from './applicators';

const decorator = DecoratorFactory.createDecorator(
  new DecoratorConfig(overArgs, new PreValueApplicator(), { setter: true })
);
export function OverArgs(...transforms: Function[]): LodashMethodDecorator {
  return decorator(...transforms);
}
export { OverArgs as overArgs };
export default decorator;
