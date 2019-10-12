import { expect } from 'chai';

import { Curry } from './curry';

describe('curry', () => {
  it('should curry the method with default arity', () => {
    class MyClass {
      @Curry()
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
      @Curry
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
      @Curry(2)
      add(a: any, b?: any, c?: any) {
        return a + b * c;
      }
    }

    const myClass = new MyClass();
    const add5 = myClass.add(5);

    expect(add5).to.be.an.instanceOf(Function);
    expect(add5(10, 2)).to.equal(25);
  });

  it('should retain the class context', () => {
    class MyClass {
      value = 10;

      @Curry()
      add(a: any, b?: any): any {
        return (a + b) * this.value;
      }
    }

    const myClass = new MyClass();
    const add5 = myClass.add(5);

    expect(add5(2)).to.equal(70);
  });
});
