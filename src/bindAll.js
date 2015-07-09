'use strict';

import bindAllClassMethods from './utils/bindAllClassMethods';
import flatten from 'lodash/array/flatten';
import assignAll, { FUNCTION_PROPERTY_EXCLUDES } from './utils/assignAll';

export default function bindAllWrapper(...methods) {
  methods = flatten(methods);

  return function bindAllDecorator(...properties) {
    if (properties.length > 1) {
      throw new Error('BindAll decorator can only be applied to a class');
    }

    const Ctor = properties[0];

    function BindAllConstructor(...args) {
      bindAllClassMethods(this, methods.length ? methods : null);

      return Ctor.apply(this, args);
    }

    BindAllConstructor.prototype = Ctor.prototype;

    return assignAll(BindAllConstructor, Ctor, FUNCTION_PROPERTY_EXCLUDES);
  };
}
