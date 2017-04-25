import { expect } from 'chai';

import { Negate } from './negate';

describe('negate', () => {
  it('should inverse the result of the function', () => {
    class MyClass {
      @Negate()
      fn() {
        return true;
      }
    }

    const myClass = new MyClass();

    expect(myClass.fn()).to.be.false;
  });
});