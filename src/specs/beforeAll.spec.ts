import { expect } from 'chai';

import { BeforeAll as _BeforeAll } from '../legacy/beforeAll';
import { specFactory } from './specFactory';

export default specFactory<typeof _BeforeAll>('beforeAll', BeforeAll => {
  it('should invoke the method before 3 times', () => {
    let calls = 0;

    class MyClass {
      @BeforeAll(3)
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

    expect(calls, 'multiple class').to.equal(2);
  });
});

