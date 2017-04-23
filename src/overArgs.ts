import { overArgs } from 'lodash';

import { DecoratorConfig, DecoratorFactory, LodashDecorator } from './factory';
import { PreValueApplicator } from './applicators';

export const OverArgsDecoratorConfig = new DecoratorConfig(overArgs, PreValueApplicator);
export const OverArgs: (...transforms: Function[]) => LodashDecorator = DecoratorFactory.createDecorator(OverArgsDecoratorConfig);