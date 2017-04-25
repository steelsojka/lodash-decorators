import { delay } from 'lodash';

import { DecoratorConfig, DecoratorFactory, LodashMethodDecorator } from './factory';
import { PreValueApplicator } from './applicators';

export const Delay: (wait: number, ...args: any[]) => LodashMethodDecorator = DecoratorFactory.createDecorator(
  new DecoratorConfig(
    function(value: Function, wait: number, ...args: any[]) {
      return function(...invokeArgs: any[]): any {
        return delay(value.bind(this), wait, ...invokeArgs, ...args);
      }
    }, 
    PreValueApplicator, 
    { setter: true }
  )
);
export { Delay as delay };
export default Delay;