'use strict';

import { expect } from 'chai';
import sinon from 'sinon';
import _ from 'lodash';
import bindAll from '../../src/bind/bindAll';
import enumerable from '../../src/extensions/enumerable';

describe('bindAll', () => {
  let spy, spy2, spy3, person, actual, PersonClass, sandbox = sinon.sandbox.create();

  beforeEach(() => {
    spy = sandbox.spy();
    spy2 = sandbox.spy();
    spy3 = sandbox.spy();

    @bindAll('fn', 'fn2')
    class Person {
      constructor() {}

      fn() {
        spy(this);
      }

      @enumerable(true)
      fn2() {
        spy2(this);
      }

      fn3() {
        spy3(this);
      }

      static staticFn() {}
    }

    PersonClass = Person;
    person = new Person();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should call the spy with the correct context', () => {
    person.fn.call(null);
    person.fn2.call(null);

    expect(spy).to.have.been.calledWith(person);
    expect(spy2).to.have.been.calledWith(person);
  });

  it('should not bind the excluded function', () => {
    person.fn3.call(null);

    expect(spy3).to.have.been.calledWith(null);
  });

  it('should retain instanceof', () => {
    expect(person).to.be.an.instanceof(PersonClass);
  });

  it('should retain static functions', () => {
    expect(PersonClass.staticFn).to.be.a.func;
  });

  it('should be non enumerable', () => {
    let descriptor = Object.getOwnPropertyDescriptor(person, 'fn');
    expect(descriptor.enumerable).to.be.false;
  });

  it('should be enumerable', () => {
    let descriptor = Object.getOwnPropertyDescriptor(person, 'fn2');
    expect(descriptor.enumerable).to.be.true;
  });

  it('should allow you to reassign the function', () => {
    function test() {
      person.fn = () => null;
    }

    expect(test).not.to.throw();
  });
});
