'use strict';

import { expect } from 'chai';
import sinon from 'sinon';
import _ from 'lodash';
import ReturnsArg from '../../src/extensions/returnsArg';

describe('extensions.returnsArg', () => {
  let spy, actual, person;
  let sandbox = sinon.sandbox.create();

  beforeEach(() => {
    spy = sandbox.spy();

    class Person {
      constructor() {}

      @ReturnsArg(1)
      fn(x, y ,z) {
        spy(x, y, z);
      }
    }

    person = new Person();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should return the second argument', () => {
    expect(person.fn(1, 2, 3)).to.equal(2);
    expect(spy).to.have.been.calledWith(1, 2, 3);
  });
});
