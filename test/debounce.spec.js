'use strict';

import { expect } from 'chai';
import sinon from 'sinon';
import _ from 'lodash';
import { debounce } from '../src';

describe('debounce', () => {
  let person, sandbox;

  class Person {
    constructor() {}

    @debounce(100)
    fn() {}
  }

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    sandbox.stub(_, 'debounce').returnsArg(0);

    person = new Person();
    person.fn();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should call the function', () => {
    expect(_.debounce).to.have.been.calledWith(Person.prototype.fn, 100);
  });
});
