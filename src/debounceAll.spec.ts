import { expect } from 'chai';

import { DebounceAll } from './debounceAll';

describe('debounceAll', () => {
  it('should debounce the method across instances', (done) => {
    let calls = 0;

    class MyClass {
      @DebounceAll(10)
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

    myClass2.fn();
    myClass2.fn();
    myClass2.fn();

    setTimeout(() => {
      expect(calls).to.equal(1);
      done();
    }, 20);
  });
});
