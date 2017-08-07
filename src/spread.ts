import { spread } from 'lodash';

import { DecoratorConfig, DecoratorFactory, LodashMethodDecorator } from './factory';
import { PreValueApplicator } from './applicators';

const decorator = DecoratorFactory.createDecorator(
  new DecoratorConfig(spread, new PreValueApplicator())
);
export function Spread(start?: number): LodashMethodDecorator {
  return decorator(start);
}
export { Spread as spread };
export default decorator;
