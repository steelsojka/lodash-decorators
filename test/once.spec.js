'use strict';

import { expect } from 'chai';
import sinon from 'sinon';
import _ from 'lodash';
import { once } from '../src';

describe('once', () => {
  let person, sandbox;

  class Person {
    constructor() {}

    @once
    fn() {}
  }

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    sandbox.stub(_, 'once').returnsArg(0);

    person = new Person();
    person.fn();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should call the function', () => {
    expect(_.once).to.have.been.calledWith(Person.prototype.fn);
  });
});
