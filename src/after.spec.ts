import { expect } from 'chai';

import { After } from './after';

describe('after', () => {
  it('should invoke the method after 3 times', () => {
    let calls = 0;

    class MyClass {
      @After(2)
      get prop() {
        return 10;
      }

      @After(3)
      fn() {
        calls++;  
      }
    }

    const myClass = new MyClass();
    const myClass2 = new MyClass();

    myClass.fn();
    myClass.fn();
    myClass.fn();
    myClass.fn();

    expect(calls, 'single class').to.equal(2);

    myClass2.fn();
    myClass2.fn();
    myClass2.fn();
    myClass2.fn();

    expect(calls, 'multiple class').to.equal(4);

    expect(myClass.prop).to.be.undefined;
    expect(myClass.prop).to.equal(10);
  });
});