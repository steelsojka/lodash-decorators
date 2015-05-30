'use strict';

import { expect } from 'chai';
import sinon from 'sinon';
import _ from 'lodash';
import { once } from '../src';

describe('once', () => {
  let person;

  class Person {
    constructor() {}

    @once
    fn() {}
  }

  beforeEach(() => {
    sinon.stub(_, 'once').returnsArg(0);


    person = new Person();
    person.fn();
  });

  it('should call the function', () => {
    expect(_.once).to.have.been.calledWith(Person.prototype.fn);
  });
});
