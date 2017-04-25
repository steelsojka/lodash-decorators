import { expect } from 'chai';
import { spy } from 'sinon';

import { Throttle, ThrottleSetter, ThrottleGetter } from './throttle';

describe('throttle', () => {
  it.only('should throttle the method', done => {
    let _spy = spy();

    class MyClass {
      @Throttle(10)
      fn(n: number) {
        console.log(n);
        _spy();
      }
    }

    const myClass = new MyClass();

    myClass.fn(1);
    myClass.fn(2);

    setTimeout(() => myClass.fn(3), 1);

    setTimeout(() => {
      expect(_spy.callCount).to.equal(1);
      done();
    }, 11);
  });

  it('should debounce the property setter', done => {
    class MyClass {
      private _value: number = 100;

      @ThrottleSetter(10)
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

    setTimeout(() => myClass.value = 20, 5);

    expect(myClass.value).to.equal(100);

    setTimeout(() => {
      expect(myClass.value).to.equal(5);
      done();
    }, 11);
  });

  it('should debounce the property getter', done => {
    class MyClass {
      private _value: number = 0;

      @ThrottleGetter(10)
      get value(): number {
        return this._value++;
      }
    }

    const myClass = new MyClass();

    expect(myClass.value).to.equal(1);
    expect(myClass.value).to.equal(1);

    setTimeout(() => expect(myClass.value).to.equal(1), 5);

    setTimeout(() => {
      expect(myClass.value).to.equal(2);
      done();
    }, 11);
  });
});
