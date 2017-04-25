import { defer } from 'lodash';

import { DecoratorConfig, DecoratorFactory, LodashMethodDecorator } from './factory';
import { InvokeApplicator } from './applicators';

export const Defer: (...args: any[]) => LodashMethodDecorator = DecoratorFactory.createDecorator(
  new DecoratorConfig(defer, InvokeApplicator, { setter: true })
);
export { Defer as defer };
export default Defer;