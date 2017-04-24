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

  it('should debounce the property setter', done => {
    class MyClass {
      private _value: number = 100;

      @Debounce(10)
      set value(value: number) {
        this._value = value;
      }

      get value(): number {
        return this._value;
      }
    }

    const myClass = new MyClass();

    myClass.value = 5;
    myClass.value = 15;

    expect(myClass.value).to.equal(100);

    setTimeout(() => {
      expect(myClass.value).to.equal(15);
      done();
    }, 11);
  });
});
