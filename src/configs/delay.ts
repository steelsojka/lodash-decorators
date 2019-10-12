import delay = require('lodash/delay');

import { DecoratorConfig } from '../factory';
import { PreValueApplicator } from '../applicators';

export default new DecoratorConfig(
  function(value: Function, wait: number, ...args: any[]) {
    return function(...invokeArgs: any[]): any {
      return delay(value.bind(this), wait, ...invokeArgs, ...args);
    };
  },
  new PreValueApplicator(),
  { setter: true }
);
