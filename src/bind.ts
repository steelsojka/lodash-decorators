import { bind } from 'lodash';

import { DecoratorConfig, DecoratorFactory, LodashMethodDecorator } from './factory';
import { BindApplicator } from './applicators';

export const BindDecoratorConfig = new DecoratorConfig(bind, BindApplicator);
export const Bind: (...partials: any[]) => LodashMethodDecorator = DecoratorFactory.createDecorator(BindDecoratorConfig);