import { expect } from 'chai';
import { spy } from 'sinon';

import { Throttle, ThrottleSetter, ThrottleGetter } from './throttle';

describe('throttle', () => {
  it('should throttle the method', (done) => {
    const _spy = spy();

    class MyClass {
      @Throttle(10)
      fn(n: number) {
        _spy();
      }
    }

    const myClass = new MyClass();

    myClass.fn(1);
    myClass.fn(2);

    setTimeout(() => myClass.fn(3), 1);
    setTimeout(() => myClass.fn(4), 2);

    setTimeout(() => {
      expect(_spy.callCount).to.equal(2);
      done();
    }, 20);
  });

  it('should debounce the property setter', (done) => {
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

    expect(myClass.value).to.equal(5);

    setTimeout(() => {
      expect(myClass.value).to.equal(20);
      done();
    }, 20);
  });

  // Skipping this test for now.
  it.skip('should debounce the property getter', (done) => {
    class MyClass {
      private _value: number = 0;

      @ThrottleGetter(10)
      get value(): number {
        return ++this._value;
      }
    }

    const myClass = new MyClass();

    expect(myClass.value).to.equal(1);
    expect(myClass.value).to.equal(1);

    setTimeout(() => expect(myClass.value).to.equal(1), 5);

    setTimeout(() => {
      expect(myClass.value).to.equal(2);
      done();
    }, 20);
  });

  it('should contain the cancel and flush methods', () => {
    class MyClass {
      @Throttle(10)
      fn() {}
    }

    const myClass = new MyClass();

    expect((myClass.fn as any).cancel).to.be.a('function');
    expect((myClass.fn as any).flush).to.be.a('function');
  });
});
