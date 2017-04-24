import { expect } from 'chai';

import { Debounce } from './debounce';

describe('debounce', () => {
  it('should debounce the method', done => {
    let calls = 0;

    class MyClass {
      @Debounce(10)
      fn() {
        calls++;
      }
    }

    const myClass = new MyClass();

    myClass.fn();
    myClass.fn();
    myClass.fn();
    myClass.fn();
    myClass.fn();

    setTimeout(() => {
      expect(calls).to.equal(1);
      done();
    }, 11);
  });
});
