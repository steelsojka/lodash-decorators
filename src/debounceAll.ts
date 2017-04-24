import { debounce } from 'lodash';

import { DecoratorConfig, DecoratorFactory, LodashMethodDecorator } from './factory';
import { PreValueApplicator } from './applicators';
import { DebounceOptions } from './shared';

export const DebounceAll: (wait?: number, options?: DebounceOptions) => LodashMethodDecorator = DecoratorFactory.createDecorator(
  new DecoratorConfig(debounce, PreValueApplicator)
);
export { DebounceAll as debounceAll };
export default DebounceAll;