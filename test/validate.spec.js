'use strict';

import { expect } from 'chai';
import sinon from 'sinon';
import _ from 'lodash';
import Validate from '../src/validate';

describe('validate', () => {
  let spy, actual, person;
  let sandbox = sinon.sandbox.create();

  beforeEach(() => {
    spy = sandbox.spy();
    sandbox.spy(_, 'isNumber');

    class Person {
      constructor() {}

      @Validate(
        _.isNumber,
        _.isString,
        [_.isNumber, _.partial(_.gt, 5)]
      )
      fn(x, y ,z) {
        spy(x, y, z);
      }
    }

    person = new Person();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should throw when the first argument is invalid', () => {
    expect(() => person.fn('abc')).to.throw;
  });

  it('should throw when the second argument is invalid', () => {
    expect(() => person.fn(123, 456)).to.throw;
  });

  it('should pass when the all arguments are valid', () => {
    person.fn(123, 'abc', 4);
    expect(spy).to.have.been.calledWith(123, 'abc', 4);
  });

  describe('when validating with an array of functions', () => {
    it('should throw when failing the first validator', () => {
      expect(() => person.fn(123, 'abc', 'xyz')).to.throw;
    });

    it('should throw when failing the second validator', () => {
      expect(() => person.fn(123, 'abc', 10)).to.throw;
    });
  });
});
