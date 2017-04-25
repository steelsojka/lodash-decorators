import { once } from 'lodash';

import { DecoratorConfig, DecoratorFactory, LodashMethodDecorator } from './factory';
import { PreValueApplicator } from './applicators';

export const Once: () => LodashMethodDecorator = DecoratorFactory.createInstanceDecorator(
  new DecoratorConfig(once, PreValueApplicator, { setter: true })
);
export { Once as once };
export default Once;