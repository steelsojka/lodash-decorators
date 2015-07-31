'use strict';

import { expect } from 'chai';
import sinon from 'sinon';
import _ from 'lodash';
import { After, Once, Curry } from '../src';

describe('proto decorators', () => {
  let spy, person, person2, actual, getSpy, setSpy;
  let sandbox = sinon.sandbox.create();

  beforeEach(() => {
    spy = sandbox.spy();

    class Person {
      constructor() {}

      @After.Proto(3)
      fn(x) {
        spy(x);
      }

      @Curry(3)
      fn2(a, b, c) {
        spy(a, b, c);
      }

      // Should be the same as @Curry(3)
      @Curry.Proto(3)
      fn3(a, b, c) {
        spy(a, b, c);
      }
    }

    person = new Person();
    person2 = new Person();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should share methods between prototypes', () => {
    person.fn2(1)(2)(3);
    person2.fn2(4, 5)(6);

    expect(spy).to.have.been.calledWith(1, 2, 3);
    expect(spy).to.have.been.calledWith(4, 5, 6);
  });

  describe('when forcing a prototype on a prototype', () => {
    it('should share methods between prototypes', () => {
      person.fn3(1)(2)(3);
      person2.fn3(4, 5)(6);

      expect(spy).to.have.been.calledWith(1, 2, 3);
      expect(spy).to.have.been.calledWith(4, 5, 6);
    });
  });

  describe('when forcing an instance method to a prototype', () => {
    it('should share methods between prototypes', () => {
      person.fn(1);
      person.fn(2);
      person2.fn(3);

      expect(spy).to.have.been.calledWith(3);
      expect(spy).to.have.been.calledOnce;
    });
  });
});
