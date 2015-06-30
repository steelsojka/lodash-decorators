'use strict';

import { expect } from 'chai';
import _ from 'lodash';
import Enumerable from '../../src/extensions/enumerable';

describe('extensions.enumerable', () => {
  class Person {
    constructor() {}

    @Enumerable(false)
    fn() {}

    @Enumerable(true)
    fn2() {}
  }

  it('should set the function to not enumerable', () => {
    const descriptor = Object.getOwnPropertyDescriptor(Person.prototype, 'fn');
    expect(descriptor.enumerable).to.be.false;
  });

  it('should set the function to enumerable', () => {
    const descriptor = Object.getOwnPropertyDescriptor(Person.prototype, 'fn2');
    expect(descriptor.enumerable).to.be.true;
  });
});
