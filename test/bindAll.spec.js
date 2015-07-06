'use strict';

import { expect } from 'chai';
import sinon from 'sinon';
import _ from 'lodash';
import bindAll from '../src/bindAll';

describe('bind', () => {
  let spy, spy2, spy3, person, actual, sandbox = sinon.sandbox.create();

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

      fn2() {
        spy2(this);
      }

      fn3() {
        spy3(this);
      }
    }

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
});
