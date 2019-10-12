import { expect } from 'chai';

import { CurryRight as _CurryRight } from '../legacy/curryRight';
import { specFactory } from './specFactory';

export default specFactory<typeof _CurryRight>('curryRight', CurryRight => {
  it('should curry the method with default arity', () => {
    class MyClass {
      @CurryRight()
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
      @CurryRight
      add(a: any, b?: any) {
        return [a, b];
      }
    }

    const myClass = new MyClass();
    const set5 = myClass.add(5) as any;

    expect(set5(10)).to.eql([10, 5]);
  });

  it('should retain the class context', () => {
    class MyClass {
      value = 'blorg';

      @CurryRight()
      add(a: any, b?: any) {
        return [a, b, this.value];
      }
    }

    const myClass = new MyClass();
    const set5 = myClass.add(5) as any;

    expect(set5(10)).to.eql([10, 5, 'blorg']);
  });
});
