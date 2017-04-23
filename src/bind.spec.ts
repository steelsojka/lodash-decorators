import { expect } from 'chai';

import { Bind } from './bind';

describe('bind', () => {
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
});