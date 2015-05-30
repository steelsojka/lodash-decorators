'use strict';

import { expect } from 'chai';
import sinon from 'sinon';
import _ from 'lodash';
import { before } from '../src';

describe('before', () => {
  let person, sandbox;

  class Person {
    constructor() {}

    @before(3)
    fn() {}
  }

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    sandbox.stub(_, 'before').returnsArg(1);

    person = new Person();
    person.fn();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should call the function', () => {
    expect(_.before).to.have.been.calledWith(3, Person.prototype.fn);
  });
});
