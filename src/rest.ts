import { rest } from 'lodash';

import { DecoratorConfig, DecoratorFactory, LodashMethodDecorator } from './factory';
import { PreValueApplicator } from './applicators';

export const Rest: (start?: number) => LodashMethodDecorator = DecoratorFactory.createDecorator(new DecoratorConfig(rest, PreValueApplicator));
export { Rest as rest };
export default Rest;