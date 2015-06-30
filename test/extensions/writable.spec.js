'use strict';

import { expect } from 'chai';
import _ from 'lodash';
import Writable from '../../src/extensions/writable';

describe('extensions.writable', () => {
  class Person {
    constructor() {}

    @Writable(false)
    fn() {}

    @Writable(true)
    fn2() {}
  }

  it('should set the function to not writable', () => {
    const descriptor = Object.getOwnPropertyDescriptor(Person.prototype, 'fn');
    expect(descriptor.writable).to.be.false;
  });

  it('should set the function to writable', () => {
    const descriptor = Object.getOwnPropertyDescriptor(Person.prototype, 'fn2');
    expect(descriptor.writable).to.be.true;
  });
});
