import once = require('lodash/once');

import { DecoratorConfig, DecoratorFactory, LodashMethodDecorator } from './factory';
import { PreValueApplicator } from './applicators';

const decorator = DecoratorFactory.createDecorator(
  new DecoratorConfig(once, new PreValueApplicator(), { setter: true })
);

export function OnceAll(): LodashMethodDecorator {
  return decorator();
}
export { OnceAll as onceAll };
export default decorator;
