import { debounce } from 'lodash';

import { DecoratorConfig, DecoratorFactory } from './factory';
import { PreValueApplicator } from './applicators';

export const DebounceDecoratorConfig = new DecoratorConfig(debounce, PreValueApplicator);
export const Debounce = DecoratorFactory.createInstanceDecorator(DebounceDecoratorConfig);