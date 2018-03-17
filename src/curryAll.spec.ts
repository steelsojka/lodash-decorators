import { expect } from 'chai';

import { CurryAll } from './curryAll';

describe('curryAll', () => {
  it('should curry the method with default arity', () => {
    class MyClass {
      @CurryAll()
      add(a: any, b?: any) {
        return a + b;
      }
    }

    const myClass = new MyClass();
    const add5 = myClass.add(5);

    expect(add5).to.be.an.instanceOf(Function);
    expect(add5(10)).to.equal(15);
  });

  it('should curry the method with default arity (paramless)', () => {
    class MyClass {
      @CurryAll
      add(a: any, b?: any) {
        return a + b;
      }
    }

    const myClass = new MyClass();
    const add5 = myClass.add(5);

    expect(add5).to.be.an.instanceOf(Function);
    expect(add5(10)).to.equal(15);
  });

  it('should curry the method with fixed arity', () => {
    class MyClass {
      @CurryAll(2)
      add(a: any, b?: any, c?: any) {
        return a + b * c;
      }
    }

    const myClass = new MyClass();
    const add5 = myClass.add(5);

    expect(add5).to.be.an.instanceOf(Function);
    expect(add5(10, 2)).to.equal(25);
  });

  it('should not retain the class context', () => {
    class MyClass {
      @CurryAll()
      add(a: any, b?: any): any {
        expect(this).to.equal(global);
      }
    }

    const myClass = new MyClass();
    const add5 = myClass.add(5);

    add5(10);
  });
});
