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
});
