import { overArgs } from 'lodash';

import { DecoratorConfig, DecoratorFactory } from './factory';
import { PreValueApplicator } from './applicators';

export const OverArgsDecoratorConfig = new DecoratorConfig(overArgs, PreValueApplicator);
export const OverArgs = DecoratorFactory.createDecorator(OverArgsDecoratorConfig);