import { delay } from 'lodash';

import { DecoratorConfig, DecoratorFactory, LodashMethodDecorator } from './factory';
import { PartialedApplicator } from './applicators';

export const Delay: (wait: number, ...args: any[]) => LodashMethodDecorator = DecoratorFactory.createDecorator(new DecoratorConfig(delay, PartialedApplicator));
export { Delay as delay };
export default Delay;