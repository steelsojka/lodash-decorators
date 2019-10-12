import { expect } from 'chai';

import { Ary as _Ary } from '../legacy/ary';
import { specFactory } from './specFactory';

export default specFactory<typeof _Ary>('ary', Ary => {
  it('should invoke the method with specified arguments', () => {
    class MyClass {
      @Ary(2)
      fn(...args: any[]) {
        expect(args.length).to.equal(2);
      }
    }

    const myClass = new MyClass();

    myClass.fn(1, 2, 3, 4, 5);
  });
});
