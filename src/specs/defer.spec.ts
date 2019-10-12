import { expect } from 'chai';
import { spy } from 'sinon';

import { Defer as _Defer } from '../legacy/defer';
import { specFactory } from './specFactory';

export default specFactory<typeof _Defer>('defer', Defer => {
  it('should defer the method', done => {
    const _spy = spy();

    class MyClass {
      @Defer('test')
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
    }, 0);
  });

  it('should defer the method (paramless)', done => {
    const _spy = spy();

    class MyClass {
      @(Defer as any)
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
      expect(_spy.getCalls()[0].args).to.eql([10]);
      done();
    }, 0);
  });

  it('should debounce the property setter', done => {
    class MyClass {
      private _value: number = 100;

      @Defer()
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
    }, 0);
  });

  it('should debounce the property setter (paramless)', done => {
    class MyClass {
      private _value: number = 100;

      @(Defer as any)
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
    }, 0);
  });
});
