import { rearg } from 'lodash';

import { DecoratorConfig, DecoratorFactory, LodashMethodDecorator } from './factory';
import { PreValueApplicator } from './applicators';

export const Rearg: (indexes: number|number[], ...args: number[]) => LodashMethodDecorator = DecoratorFactory.createDecorator(
  new DecoratorConfig(rearg, new PreValueApplicator())
);
export { Rearg as rearg };
export default Rearg;