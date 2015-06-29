'use strict';

import { expect } from 'chai';
import sinon from 'sinon';
import _ from 'lodash';
import { tap } from '../../src';

describe('tap', () => {
  let spy, person, actual, sandbox = sinon.sandbox.create();

  beforeEach(() => {
    spy = sandbox.spy();

    class Person {
      constructor() {}

      @tap
      fn(x) {
        spy(x);
        return 123;
      }
    }

    person = new Person();
    actual = person.fn('abc');
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should return the result', () => {
    expect(actual).to.equal('abc');
  });

  it('should call the function', () => {
    expect(spy).to.have.been.calledWith('abc');
  });
});
