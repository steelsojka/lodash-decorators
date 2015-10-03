'use strict';

import { expect } from 'chai';
import sinon from 'sinon';
import _ from 'lodash';
import bind from '../../src/bind/bind';
import { after } from '../../src';

// This is currently broken :(
describe.skip('bind', () => {
  let spy, spy2, spy3, person, actual, sandbox = sinon.sandbox.create();

  beforeEach(() => {
    spy = sandbox.spy();
    spy2 = sandbox.spy();
    spy3 = sandbox.spy();

    class Person {
      constructor() {}

      @bind()
      @after(2)
      fn() {
        spy(this);
      }

      @after(2)
      @bind()
      fn2() {
        spy2(this);
      }

      @bind('John')
      fn3(name) {
        spy3(this, name);
      }
    }

    person = new Person();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('when bind is first in the chain', () => {
    it('should call the function in the correct context', () => {
      person.fn.call(null);
      person.fn.call(null);
      person.fn.call(null);
      expect(spy).to.have.been.calledWith(person);
      expect(spy).to.have.been.calledOnce;
    });

    it('should not call the function', () => {
      person.fn.call(null);
      expect(spy).not.to.have.been.calledWith(person);
    });
  });

  describe('when bind is last in the chain', () => {
    it('should call the function in the correct context', () => {
      person.fn2.call(null);
      person.fn2.call(null);
      person.fn2.call(null);
      expect(spy2).to.have.been.calledWith(person);
      expect(spy2).to.have.been.calledOnce;
    });

    it('should not call the function', () => {
      person.fn2.call(null);
      expect(spy2).not.to.have.been.calledWith(person);
    });
  });

  describe('when bind is used with an argument', () => {
    it('should call the function with the correct argument', () => {
      person.fn3.call(null);
      expect(spy3).to.have.been.calledWith(person, 'John');
    });
  })
});
