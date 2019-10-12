import { expect } from 'chai';

import { Tap as _Tap } from '../legacy/tap';
import { specFactory } from './specFactory';

export default specFactory<typeof _Tap>('tap', Tap => {
  it('should return the first argument', () => {
    class MyClass {
      @Tap()
      fn(n: number): any {
        return 10;
      }
    }

    const myClass = new MyClass();

    expect(myClass.fn(50)).to.equal(50);
  });

  it('should return the first argument (paramless)', () => {
    class MyClass {
      @Tap
      fn(n: number): any {
        return 10;
      }
    }

    const myClass = new MyClass();

    expect(myClass.fn(50)).to.equal(50);
  });
});
