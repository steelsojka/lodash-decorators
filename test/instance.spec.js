'use strict';

import { expect } from 'chai';
import sinon from 'sinon';
import _ from 'lodash';
import { After, Once, Memoize } from '../src';

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

      @After(2)
      @Once
      get name() {
        getSpy();
        return '';
      }

      @Once
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
});
