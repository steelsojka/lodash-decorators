import once = require('lodash/once');

import { DecoratorConfig, DecoratorFactory, LodashMethodDecorator } from './factory/index';
import { PreValueApplicator } from './applicators/index';

const decorator = DecoratorFactory.createInstanceDecorator(
  new DecoratorConfig(once, new PreValueApplicator(), { setter: true })
);

export function Once(): LodashMethodDecorator {
  return decorator();
}
export { Once as once };
export default decorator;
