import { overArgs } from 'lodash';

import { DecoratorConfig, DecoratorFactory, LodashMethodDecorator } from './factory';
import { PreValueApplicator } from './applicators';

export const OverArgsDecoratorConfig = new DecoratorConfig(overArgs, PreValueApplicator);
export const OverArgs: (...transforms: Function[]) => LodashMethodDecorator = DecoratorFactory.createDecorator(OverArgsDecoratorConfig);