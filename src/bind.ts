import { bind } from 'lodash';

import { DecoratorConfig, DecoratorFactory, LodashDecorator } from './factory';
import { BindApplicator } from './applicators';

export const BindDecoratorConfig = new DecoratorConfig(bind, BindApplicator);
export const Bind: (...partials: any[]) => LodashDecorator = DecoratorFactory.createDecorator(BindDecoratorConfig);