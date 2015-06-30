'use strict';

import { expect } from 'chai';
import _ from 'lodash';
import Configurable from '../../src/extensions/configurable';

describe('extensions.configurable', () => {
  class Person {
    constructor() {}

    @Configurable(false)
    fn() {}

    @Configurable(true)
    fn2() {}
  }

  it('should set the function to not configurable', () => {
    const descriptor = Object.getOwnPropertyDescriptor(Person.prototype, 'fn');
    expect(descriptor.configurable).to.be.false;
  });

  it('should set the function to configurable', () => {
    const descriptor = Object.getOwnPropertyDescriptor(Person.prototype, 'fn2');
    expect(descriptor.configurable).to.be.true;
  });
});
