'use strict';

import { expect } from 'chai';
import sinon from 'sinon';
import _ from 'lodash';
import { Debounce, After, Once, Memoize } from '../src';

describe('instance decorators', () => {
  let spy, person, person2, actual, getSpy, setSpy;
  let sandbox = sinon.sandbox.create();

  beforeEach(() => {
    spy = sandbox.spy();
    getSpy = sandbox.spy();
    setSpy = sandbox.spy();

    class Person {
      constructor() {}

      @After(2)
      @Memoize()
      @Once
      fn(x) {
        spy(x);
        return 123;
      }

      @Debounce(50)
      fn2() {
      }

      @Debounce(100)
      @After(2)
      fn3() {
      }

      @After.get(2)
      @Once.get
      get name() {
        getSpy();
        return '';
      }

      @Once.set
      set name(name) {
        setSpy(name);
      }
    }

    person = new Person();
    person2 = new Person();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('when returning the function', () => {
    it('should contain any metadata', () => {
      expect(person.fn2.cancel).to.be.a.func;
    });

    it('should transfer metadata', () => {
      expect(person.fn3.cancel).to.be.a.func;
    });
  });

  describe('when using a function', () => {
    it('should not call the spy', () => {
      person.fn(333);
      expect(spy).not.to.have.been.called;
    });

    it('should call the spy', () => {
      person.fn(333);
      person.fn(333);
      person.fn(333);
      person.fn(333);
      person.fn(333);

      person2.fn(444);
      person2.fn(444);
      person2.fn(444);
      person2.fn(444);
      person2.fn(444);

      expect(spy).to.have.been.calledTwice;
      expect(spy).to.have.been.calledWith(333);
      expect(spy).to.have.been.calledWith(444);
    });

    it('should reassign the function', () => {
      let fn = () => null;

      person.fn = fn;

      expect(person.fn).to.equal(fn);
    });
  });

  describe('when using a getter', () => {
    it('should not call the spy', () => {
      let name = person.name;
      expect(getSpy).not.to.have.been.called;
    });

    it('should call the spy', () => {
      let name = person.name;
      name = person.name;
      name = person.name;
      name = person.name;
      name = person.name;

      name = person2.name;
      name = person2.name;
      name = person2.name;
      name = person2.name;
      name = person2.name;

      expect(getSpy).to.have.been.calledTwice;
    });
  });

  describe('when using a setter', () => {
    beforeEach(() => {
      person.name = 'Joe';
      person.name = 'John';
      person.name = 'Jim';
      person.name = 'Jimmy';

      person2.name = 'Brian';
      person2.name = 'David';
      person2.name = 'Steven';
      person2.name = 'Brad';
    });

    it('should call the spy only once', () => {
      expect(setSpy).to.have.been.calledTwice;
      expect(setSpy).to.have.been.calledWith('Joe');
      expect(setSpy).to.have.been.calledWith('Brian');
    });
  });

  describe('when reassigning a decorator', () => {
    it('should re define the function', () => {
      class Person {
        constructor() {
          this.fn = () => spy();
        }

        @Debounce(100)
        fn() {}
      }

      let person = new Person();
      person.fn();
      expect(spy).to.have.been.called;
    });
  });
});
