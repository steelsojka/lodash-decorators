import { once } from 'lodash';

import { DecoratorConfig, DecoratorFactory } from './factory';
import { PreValueApplicator } from './applicators';

export const Once = DecoratorFactory.createInstanceDecorator(new DecoratorConfig(once, PreValueApplicator))();
export { Once as once };
export default Once;