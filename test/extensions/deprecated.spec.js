'use strict';

import sinon from 'sinon';
import { expect } from 'chai';
import Deprecated from '../../src/extensions/deprecated';

describe('extensions.deprecated', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    sandbox.spy(console, 'warn');
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should call warn from the class deprecation', () => {
    @Deprecated
    class Person {
      constructor() {}
    }

    let person = new Person();
    let person2 = new Person();

    expect(console.warn).to.have.been.calledTwice;
  });

  it('should call warn when the method is invoked', () => {
    class Person {
      constructor() {}

      @Deprecated
      fn() {}
    }

    let person = new Person();
    person.fn();

    expect(console.warn).to.have.been.calledOnce;
  });
});
