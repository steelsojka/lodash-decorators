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

  it('should override the function method', () => {
    Deprecated.methodAction = sandbox.spy();

    class Person {
      constructor() {}

      @Deprecated
      fn() {}
    }

    let person = new Person();
    person.fn();

    expect(Deprecated.methodAction).to.have.been.calledOnce;
  });

  it('should override the class', () => {
    Deprecated.classAction = sandbox.spy();

    @Deprecated
    class Person {
      constructor() {}

      fn() {}
    }

    let person = new Person();

    expect(Deprecated.classAction).to.have.been.calledOnce;
  });
});
