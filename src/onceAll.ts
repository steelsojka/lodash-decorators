import once = require('lodash/once');

import { DecoratorConfig, DecoratorFactory } from './factory';
import { PreValueApplicator } from './applicators';

export function OnceAll() {
  return DecoratorFactory.createDecorator(
    new DecoratorConfig(once, new PreValueApplicator(), { setter: true })
  )();
}
export { OnceAll as onceAll };
export default OnceAll;
