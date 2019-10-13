import { expect } from 'chai';

import { Bind as _Bind } from '../legacy/bind';
import { Once as _Once } from '../legacy/once';
import { specFactory } from './specFactory';

export default specFactory<typeof _Bind, typeof _Once>('bind', (Bind, Once) => {
  it('should bind the context of the method', () => {
    let context;

    class MyClass {
      @Bind()
      fn() {
        context = this;
      }
    }

    const myClass = new MyClass();
    const myClass2 = new MyClass();

    myClass.fn.call(null);
    expect(context).to.equal(myClass);

    myClass2.fn.call(null);
    expect(context).to.equal(myClass2);
  });

  it('should bind with other decorators', () => {
    let context;

    class MyClass {
      @Once()
      @Bind()
      fn() {
        context = this;
      }
    }

    const myClass = new MyClass();

    myClass.fn.call(null);
    expect(context).to.equal(myClass);
  });

  it('should bind without params', () => {
    let context;

    class MyClass {
      @Bind
      fn() {
        context = this;
      }
    }

    const myClass = new MyClass();
    const myClass2 = new MyClass();

    myClass.fn.call(null);
    expect(context).to.equal(myClass);

    myClass2.fn.call(null);
    expect(context).to.equal(myClass2);
  });

  it('should not bind when accessed on the prototype', () => {
    let context;

    class MyClass {
      @Bind
      fn() {
        context = this;
      }
    }

    MyClass.prototype.fn();

    const myClass = new MyClass();

    myClass.fn.call(null);

    expect(context).to.equal(myClass);
  });
});
