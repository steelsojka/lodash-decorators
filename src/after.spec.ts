import { expect } from 'chai';

import { After } from './after';

describe('after', () => {
  it('should invoke the method after 3 times', () => {
    let calls = 0;

    class MyClass {
      props: number[] = [];

      @After(2)
      set prop(val: number) {
        this.props.push(val);
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

    myClass.prop = 50
    myClass.prop = 100

    expect(myClass.props.length, 'setter length').to.equal(1);
    expect(myClass.props[0], 'setter value').to.equal(100);
  });
});