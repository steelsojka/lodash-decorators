import { expect } from 'chai';

import { OverArgs } from './overArgs';

const add = (n: number) => (v: number) => v + n;

describe('overArgs', () => {
  it('should transform each argument', () => {
    class MyClass {
      @OverArgs(add(10), add(5))
      fn(a: number, b: number): [ number, number ] {
        return [ a, b ];
      }
    }

    const myClass = new MyClass();

    expect(myClass.fn(5, 50)).to.eql([ 15, 55 ]);
  });
});