import { expect } from 'chai';

import { CurryRightAll } from './curryRightAll';

describe('curryRightAll', () => {
  it('should curry the method with default arity', () => {
    class MyClass {
      @CurryRightAll()
      add(a: any, b?: any) {
        return [ a, b ];
      }
    }

    const myClass = new MyClass();
    const set5 = myClass.add(5) as any;

    expect(set5(10)).to.eql([ 10, 5 ]);
  });
});
