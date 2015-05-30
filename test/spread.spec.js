'use strict';

import { expect } from 'chai';
import sinon from 'sinon';
import _ from 'lodash';
import { spread } from '../src';

describe('spread', () => {
  let person, sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });


  it('should call the function', () => {
    sandbox.stub(_, 'spread').returnsArg(0);

    class Person {
      constructor() {}

      @spread
      fn() {}
    }

    expect(_.spread).to.have.been.calledWith(sinon.match.func);
  });
});
