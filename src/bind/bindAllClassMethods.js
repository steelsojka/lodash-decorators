'use strict';

import isFunction from 'lodash/lang/isFunction';
import isNull from 'lodash/lang/isNull';
import noop from 'lodash/utility/noop';
import isBoolean from 'lodash/lang/isBoolean';
import copyMetaData from '../utils/copyMetaData';
import bindMap from './bindMap';

export default function bindAllClassMethods(object, methods = null, source = object) {
  let usePick = Array.isArray(methods);
  let properties = Object.getOwnPropertyNames(source);

  for (let i = 0, len = properties.length; i < len; i++) {
    let key = properties[i];

    if (usePick && methods.indexOf(key) === -1) {
      continue;
    }

    let descriptor = Object.getOwnPropertyDescriptor(source, key) || {};

    if (!object.hasOwnProperty(key) && key !== 'constructor') {
      if (!descriptor.get && isFunction(descriptor.value)) {
        Object.defineProperty(object, key, {
          value: copyMetaData(descriptor.value.bind(object), descriptor.value),
          configurable: true,
          enumerable: isBoolean(descriptor.enumerable) ? descriptor.enumerable : false,
          writable: isBoolean(descriptor.writable) ? descriptor.writable : true
        });
      } else if (descriptor.get) {
        if (!bindMap.has([object, key])) {
          bindMap.set([object, key], true);
        }
      }
    }
  }

  let nextProto = Object.getPrototypeOf(source);

  if (!isNull(nextProto) && Object.prototype !== nextProto) {
    bindAllClassMethods(object, methods, nextProto);
  }

  return object;
}
