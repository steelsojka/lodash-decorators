import { once } from 'lodash';

import { DecoratorConfig, DecoratorFactory, LodashMethodDecorator } from './factory';
import { PreValueApplicator } from './applicators';

const decorator = DecoratorFactory.createInstanceDecorator(
  new DecoratorConfig(once, new PreValueApplicator(), { setter: true })
);

export function Once(): LodashMethodDecorator {
  return decorator();
}
export { Once as once };
export default decorator;
