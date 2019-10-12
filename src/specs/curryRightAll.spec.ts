import { expect } from 'chai';

import { CurryRightAll as _CurryRightAll } from '../legacy/curryRightAll';
import { specFactory } from './specFactory';

export default specFactory('curryRightAll', CurryRightAll => {
  it('should curry the method with default arity', () => {
    class MyClass {
      @CurryRightAll()
      add(a: any, b?: any) {
        return [a, b];
      }
    }

    const myClass = new MyClass();
    const set5 = myClass.add(5) as any;

    expect(set5(10)).to.eql([10, 5]);
  });

  it('should curry the method with default arity (paramless)', () => {
    class MyClass {
      @CurryRightAll
      add(a: any, b?: any) {
        return [a, b];
      }
    }

    const myClass = new MyClass();
    const set5 = myClass.add(5) as any;

    expect(set5(10)).to.eql([10, 5]);
  });
});
