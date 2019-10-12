import throttle = require('lodash/throttle');

import { DecoratorConfig } from '../factory';
import { PreValueApplicator } from '../applicators';

export const throttleConfig = new DecoratorConfig(
  throttle,
  new PreValueApplicator(),
  {
    getter: true,
    optionalParams: true,
    setter: true
  }
);

export const throttleGetterConfig = new DecoratorConfig(
  throttle,
  new PreValueApplicator(),
  {
    getter: true,
    optionalParams: true
  }
);

export const throttleSetterConfig = new DecoratorConfig(
  throttle,
  new PreValueApplicator(),
  {
    optionalParams: true,
    setter: true
  }
);
