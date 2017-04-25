import { expect } from 'chai';

import { Partial } from './partial';

describe('partial', () => {
  it('should invoke the method only once', () => {
    let calls = 0;

    class MyClass {
      @Partial()
      fn() {
        calls++;  
      }
    }

    const myClass = new MyClass();
    const myClass2 = new MyClass();

    myClass.fn();
    myClass.fn();
    myClass.fn();

    expect(calls, 'single class').to.equal(1);

    myClass2.fn();
    myClass2.fn();
    myClass2.fn();

    expect(calls, 'multiple class').to.equal(2);
  });
});