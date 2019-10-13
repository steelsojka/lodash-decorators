import { expect } from 'chai';

import { Attempt as _Attempt } from '../legacy/attempt';
import { specFactory } from './specFactory';

export default specFactory<typeof _Attempt>('attempt', Attempt => {
  it('should catch the error and return it', () => {
    class MyClass {
      @Attempt()
      fn() {
        throw new Error();
      }

      @Attempt()
      fn2() {
        return 10;
      }
    }

    const myClass = new MyClass();

    expect(myClass.fn()).to.be.an.instanceOf(Error);
    expect(myClass.fn2()).to.equal(10);
  });

  it('should catch the error and return it (paramless)', () => {
    class MyClass {
      @Attempt
      fn() {
        throw new Error();
      }

      @Attempt
      fn2() {
        return 10;
      }
    }

    const myClass = new MyClass();

    expect(myClass.fn()).to.be.an.instanceOf(Error);
    expect(myClass.fn2()).to.equal(10);
  });
});
