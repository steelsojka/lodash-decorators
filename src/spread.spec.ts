import { expect } from 'chai';

import { Spread } from './spread';

describe('spread', () => {
  it('should spread the arguments', () => {
    class MyClass {
      @Spread()
      fn(...args: any[]) {
        expect(args.length).to.equal(4);
        expect(args).to.eql([ 1, 2, 3, 4 ]);
      }
    }

    const myClass = new MyClass();

    myClass.fn([ 1, 2, 3, 4 ]);
  });

  it('should spread the arguments (paramless)', () => {
    class MyClass {
      @Spread
      fn(...args: any[]) {
        expect(args.length).to.equal(4);
        expect(args).to.eql([ 1, 2, 3, 4 ]);
      }
    }

    const myClass = new MyClass();

    myClass.fn([ 1, 2, 3, 4 ]);
  });
});
