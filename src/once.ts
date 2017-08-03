import once = require('lodash/once');

import { DecoratorConfig, DecoratorFactory, LodashMethodDecorator } from './factory';
import { PreValueApplicator } from './applicators';

export function Once(): LodashMethodDecorator {
  return DecoratorFactory.createInstanceDecorator(
    new DecoratorConfig(once, new PreValueApplicator(), { setter: true })
  )();
}
export { Once as once };
export default Once;
