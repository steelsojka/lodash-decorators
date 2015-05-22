'use strict';

import settings from './settings';

// Marks a property as a getter property. This is the only way
// to distinguish from an instance decorator vs a getter property.
export default function getterAnnotation(target, name, descriptor) {
  if (descriptor.get) {
    descriptor.get[`${settings.annotationPrefix}isGetter`] = true;
  }

  return descriptor;
}
