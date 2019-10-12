import { expect } from 'chai';

import { Wrap as _Wrap } from '../legacy/wrap';
import { specFactory } from './specFactory';

export default specFactory<typeof _Wrap>('wrap', Wrap => {
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

