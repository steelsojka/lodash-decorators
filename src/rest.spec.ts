import { expect } from 'chai';

import { Rest } from './rest';

describe('rest', () => {
  it('should change the order of arguments', () => {
    class MyClass {
      @Rest(1)
      fn(...args: any[]) {
        expect(args.length).to.equal(2);
        expect(args[0]).to.equal(1);
        expect(args[1]).to.eql([ 2, 3, 4 ]);
      }
    }

    const myClass = new MyClass();

    myClass.fn(1, 2, 3, 4);
  });

  it('should change the order of arguments (paramless)', () => {
    class MyClass {
      @Rest
      fn(...args: any[]) {
        expect(args.length).to.equal(1);
        expect(args[0]).to.eql([ 1, 2, 3, 4 ]);
      }
    }

    const myClass = new MyClass();

    myClass.fn(1, 2, 3, 4);
  });
});
