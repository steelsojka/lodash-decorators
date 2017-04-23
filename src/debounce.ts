import { debounce } from 'lodash';

import { DecoratorConfig, DecoratorFactory, LodashDecorator } from './factory';
import { PreValueApplicator } from './applicators';

export interface DebounceOptions {
  wait?: number;
  leading?: boolean;
  trailing?: boolean;
  maxWait?: number;
}

export const DebounceDecoratorConfig = new DecoratorConfig(debounce, PreValueApplicator);
export const Debounce: (wait?: number, options?: DebounceOptions) => LodashDecorator = DecoratorFactory.createInstanceDecorator(DebounceDecoratorConfig);