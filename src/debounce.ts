import { debounce } from 'lodash';

import { DecoratorConfig, DecoratorFactory, LodashMethodDecorator } from './factory';
import { PreValueApplicator } from './applicators';
import { DebounceOptions } from './shared';

export const Debounce: (wait?: number, options?: DebounceOptions) => LodashMethodDecorator = DecoratorFactory.createInstanceDecorator(
  new DecoratorConfig(debounce, PreValueApplicator)
);
export { Debounce as debounce };
export default Debounce;