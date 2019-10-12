import { expect } from 'chai';

import { Wrap } from './wrap';

describe('wrap', () => {
  it('should wrap the function', () => {
    class MyClass {
      @Wrap('fn')
      fn2(fn?: any, arg?: any): any {
        return fn(arg);
      }

      fn(n: any) {
        return n;
      }
    }

    const myClass = new MyClass();

    expect(myClass.fn2(50)).to.equal(50);
  });
});
