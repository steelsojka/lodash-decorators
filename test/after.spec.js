'use strict';

import { expect } from 'chai';
import sinon from 'sinon';
import _ from 'lodash';
import { after } from '../src';

describe('after', () => {
  let person;

  class Person {
    constructor() {}

    @after(3)
    fn() {}
  }

  beforeEach(() => {
    sinon.stub(_, 'after').returnsArg(1);

    person = new Person();
    person.fn();
  });

  it('should call the function', () => {
    expect(_.after).to.have.been.calledWith(3, Person.prototype.fn);
  });
});
