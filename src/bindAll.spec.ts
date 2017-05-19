import { expect } from 'chai';

import { BindAll } from './bindAll';
import { Debounce } from './debounce';

describe('bindAll', () => {
  it('should bind all method to the context', () => {
    let context;

    class Parent {
      fn() {
        context = this;
      }
    }

    @BindAll()
    class MyClass extends Parent {
      fn2() {
        context = this;
      }
    }

    const myClass = new MyClass();

    myClass.fn.call(null);
    expect(context).to.equal(myClass);

    myClass.fn2.call(null);
    expect(context).to.equal(myClass);
  });

  it('should bind only specified methods to the context', () => {
    let context;

    class Parent {
      fn() {
        context = this;
      }
    }

    @BindAll([ 'fn' ])
    class MyClass extends Parent {
      fn2() {
        context = this;
      }
    }

    const myClass = new MyClass();

    myClass.fn.call(null);
    expect(context).to.equal(myClass);

    myClass.fn2.call(null);
    expect(context).to.equal(null);
  });

  it('should work with getters', () => {
    @BindAll()
    class MyClass {
      get prop(): string {
        return 'blorg';
      }

      fn() {
        return this.prop;
      }
    }

    const myClass = new MyClass();

    myClass.fn.call(null);
    expect(myClass.fn()).to.equal('blorg');
  });

  it('should not access getters that are not decorated', () => {
    let accessed = false;

    @BindAll()
    class MyClass {
      get prop(): string {
        accessed = true;

        return 'blorg';
      }

      @Debounce()
      get prop2(): string {
        return 'test';
      }

      @Debounce(1)
      fn() {
        return this.prop;
      }
    }

    const myClass = new MyClass();

    expect(myClass.hasOwnProperty('fn')).to.be.true;
    expect(myClass.hasOwnProperty('prop')).to.be.false;
    expect(myClass.hasOwnProperty('prop2')).to.be.false;
  });
});
