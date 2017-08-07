import once = require('lodash/once');

import { DecoratorConfig, DecoratorFactory, LodashMethodDecorator } from './factory/index';
import { PreValueApplicator } from './applicators/index';

const decorator = DecoratorFactory.createDecorator(
  new DecoratorConfig(once, new PreValueApplicator(), { setter: true })
);

export function OnceAll(): LodashMethodDecorator {
  return decorator();
}
export { OnceAll as onceAll };
export default decorator;
