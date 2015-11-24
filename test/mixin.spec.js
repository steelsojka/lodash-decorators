import { expect } from 'chai';
import sinon from 'sinon';
import _ from 'lodash';
import { Mixin } from '../src';

describe('mixin', () => {
  let toMixin;

  beforeEach(() => {
    toMixin = {
      test() {},
      test2() {}
    };
  });

  it('should mixin the methods', () => {
    @Mixin(toMixin)
    class Person {
      constructor() {}

      fn(x) {
        return 123;
      }
    }

    expect(Person.prototype.test).to.be.a.func
    expect(Person.prototype.test).to.equal(toMixin.test);
    expect(Person.prototype.test2).to.be.a.func
    expect(Person.prototype.test2).to.equal(toMixin.test2);
  });
});
