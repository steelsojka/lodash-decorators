import { expect } from 'chai';

import { BindAll } from './bindAll';

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
});
