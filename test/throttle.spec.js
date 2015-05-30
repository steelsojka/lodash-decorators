'use strict';

import { expect } from 'chai';
import sinon from 'sinon';
import _ from 'lodash';
import { throttle } from '../src';

describe('throttle', () => {
  let person;

  class Person {
    constructor() {}

    @throttle(100)
    fn() {}
  }

  beforeEach(() => {
    sinon.stub(_, 'throttle').returnsArg(0);

    person = new Person();
    person.fn();
  });

  it('should call the function', () => {
    expect(_.throttle).to.have.been.calledWith(Person.prototype.fn, 100);
  });
});
