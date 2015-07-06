'use strict';

import bindAllClassMethods from './utils/bindAllClassMethods';
import flatten from 'lodash/array/flatten';

export default function bindAllWrapper(...methods) {
  methods = flatten(methods);

  return function bindAllDecorator(...properties) {
    if (properties.length > 1) {
      throw new Error('BindAll decorator can only be applied to a class');
    }

    const ctor = properties[0];

    function BindAllWrapper(...args) {
      bindAllClassMethods(this, methods.length ? methods : null);

      return ctor.apply(this, args);
    }

    BindAllWrapper.prototype = ctor.prototype;

    return BindAllWrapper;
  };
}
