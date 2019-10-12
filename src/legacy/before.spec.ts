import { expect } from 'chai';

import { Before } from './before';

describe('before', () => {
  it('should invoke the method before 3 times', () => {
    let calls = 0;

    class MyClass {
      @Before(3)
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
    myClass.fn();
    myClass.fn();

    expect(calls, 'single class').to.equal(2);

    myClass2.fn();
    myClass2.fn();
    myClass2.fn();
    myClass2.fn();
    myClass2.fn();
    myClass2.fn();

    expect(calls, 'multiple class').to.equal(4);
  });
});
