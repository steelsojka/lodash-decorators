'use strict';

import { expect } from 'chai';
import sinon from 'sinon';
import _ from 'lodash';
import { debounce } from '../src';

describe('debounce', () => {
  let person;

  class Person {
    constructor() {}

    @debounce(100)
    fn() {}
  }

  beforeEach(() => {
    sinon.stub(_, 'debounce').returnsArg(0);

    person = new Person();
    person.fn();
  });

  it('should call the function', () => {
    expect(_.debounce).to.have.been.calledWith(Person.prototype.fn, 100);
  });
});
