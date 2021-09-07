import { expect } from 'chai';

import { Tap } from './tap';

describe('tap', () => {
  it('should return the first argument', () => {
    class MyClass {
      @Tap()
      fn(_n: number): any {
        return 10;
      }
    }

    const myClass = new MyClass();

    expect(myClass.fn(50)).to.equal(50);
  });

  it('should return the first argument (paramless)', () => {
    class MyClass {
      @Tap
      fn(_n: number): any {
        return 10;
      }
    }

    const myClass = new MyClass();

    expect(myClass.fn(50)).to.equal(50);
  });
});
