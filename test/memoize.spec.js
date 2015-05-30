'use strict';

import { expect } from 'chai';
import sinon from 'sinon';
import _ from 'lodash';
import { memoize } from '../src';

describe('memoize', () => {
  let person;
  let resolver = item => item.toString();

  class Person {
    constructor() {}

    @memoize(resolver)
    fn() {}
  }

  beforeEach(() => {
    sinon.stub(_, 'memoize').returnsArg(0);

    person = new Person();
    person.fn();
  });

  it('should call the function', () => {
    expect(_.memoize).to.have.been.calledWith(Person.prototype.fn, resolver);
  });
});
