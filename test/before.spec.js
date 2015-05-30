'use strict';

import { expect } from 'chai';
import sinon from 'sinon';
import _ from 'lodash';
import { before } from '../src';

describe('before', () => {
  let person;

  class Person {
    constructor() {}

    @before(3)
    fn() {}
  }

  beforeEach(() => {
    sinon.stub(_, 'before').returnsArg(1);

    person = new Person();
    person.fn();
  });

  it('should call the function', () => {
    expect(_.before).to.have.been.calledWith(3, Person.prototype.fn);
  });
});
