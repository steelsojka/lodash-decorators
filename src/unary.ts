import { unary } from 'lodash';

import { DecoratorConfig, DecoratorFactory } from './factory';
import { PreValueApplicator } from './applicators';

export const Unary = DecoratorFactory.createDecorator(new DecoratorConfig(unary, PreValueApplicator))();
export { Unary as unary };
export default Unary;