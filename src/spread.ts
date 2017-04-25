import { spread } from 'lodash';

import { DecoratorConfig, DecoratorFactory, LodashMethodDecorator } from './factory';
import { PreValueApplicator } from './applicators';

export const Spread: (start?: number) => LodashMethodDecorator = DecoratorFactory.createDecorator(
  new DecoratorConfig(spread, PreValueApplicator)
);
export { Spread as spread };
export default Spread;