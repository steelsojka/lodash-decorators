import { flip } from 'lodash';

import { DecoratorConfig, DecoratorFactory, LodashMethodDecorator } from './factory';
import { PreValueApplicator } from './applicators';

export const Flip: () => LodashMethodDecorator = DecoratorFactory.createDecorator(
  new DecoratorConfig(flip, new PreValueApplicator())
);
export { Flip as flip };
export default Flip;