'use strict';

import { expect } from 'chai';
import sinon from 'sinon';
import _ from 'lodash';
import ValidateReturn from '../../src/validate/validateReturn';

describe('validate.validateReturn', () => {
  let spy, actual, person;
  let sandbox = sinon.sandbox.create();

  beforeEach(() => {
    spy = sandbox.spy();
    sandbox.spy(_, 'isNumber');

    class Person {
      constructor() {}

      @ValidateReturn(_.isString)
      fn(x) {
        return x;
      }
    }

    person = new Person();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should throw when invalid', () => {
    expect(() => person.fn(123)).to.throw;
  });

  it('should not throw when valid', () => {
    expect(person.fn('abc')).to.equal('abc');
  });
});
