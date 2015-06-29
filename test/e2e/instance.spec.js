'use strict';

import { expect } from 'chai';
import sinon from 'sinon';
import _ from 'lodash';
import { After, Once, Memoize } from '../../src';

describe('instance decorators', () => {
  let spy, person, actual, getSpy;
  let sandbox = sinon.sandbox.create();

  beforeEach(() => {
    spy = sandbox.spy();
    getSpy = sandbox.spy();

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
    }

    person = new Person();
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

      expect(spy).to.have.been.calledOnce;
      expect(spy).to.have.been.calledWith(333);
    });
  });

  describe('when using a getter', () => {
    it('should not call the spy', () => {
      let name = person.name;
      expect(getSpy).not.to.have.been.called;
    });

    it('should call the spy once', () => {
      let name = person.name;
      name = person.name;
      name = person.name;
      name = person.name;
      name = person.name;

      expect(getSpy).to.have.been.calledOnce;
    });
  });
});
