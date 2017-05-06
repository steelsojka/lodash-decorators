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

  it('should inverse the result of the resolved function', () => {
    class MyClass {
      @Negate('fn')
      fn2: () => boolean;

      fn() {
        return true;
      }
    }

    const myClass = new MyClass();

    expect(myClass.fn2()).to.be.false;
  });
});
