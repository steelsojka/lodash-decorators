import { expect } from 'chai';

import { Rearg } from './rearg';

describe('rearg', () => {
  it('should change the order of arguments', () => {
    class MyClass {
      @Rearg(2, 1, 0)
      fn(a: any, b: any, c: any): any[] {
        return [ a, b, c ];
      }
    }

    const myClass = new MyClass();

    expect(myClass.fn(1, 2, 3)).to.eql([ 3, 2, 1 ]);
  });

  it('should change the order of the resolved function', () => {
    class MyClass {
      @Rearg('fn', 2, 1, 0)
      fn2: Function;

      fn(a: any, b: any, c: any): any[] {
        return [ a, b, c ];
      }
    }

    const myClass = new MyClass();

    expect(myClass.fn2(1, 2, 3)).to.eql([ 3, 2, 1 ]);
  });
});
