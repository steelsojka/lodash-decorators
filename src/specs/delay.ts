import { expect } from 'chai';
import { spy } from 'sinon';

import { Delay as _Delay } from '../legacy/delay';
import { specFactory } from './specFactory';

export default specFactory<typeof _Delay>('delay', Delay => {
  it('should delay the method', done => {
    const _spy = spy();

    class MyClass {
      @Delay(15, 'test')
      fn(...args: any[]) {
        expect(this, 'context').to.equal(myClass);
        _spy(...args);
      }
    }

    const myClass = new MyClass();

    myClass.fn(10);
    expect(_spy.called).to.be.false;

    setTimeout(() => {
      expect(_spy.callCount).to.equal(1);
      expect(_spy.getCalls()[0].args).to.eql([10, 'test']);
      done();
    }, 16);
  });

  it('should debounce the property setter', done => {
    class MyClass {
      private _value: number = 100;

      @Delay(15)
      set value(value: number) {
        expect(this, 'context').to.equal(myClass);
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
    }, 15);
  });
});
