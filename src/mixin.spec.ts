import { expect } from 'chai';

import { Mixin } from './mixin';

describe('mixin', () => {
  it('should mixin the object', () => {
    const myApi = {
      fn2() {}
    };

    @Mixin(myApi)
    class MyClass {
      fn() {}
    }

    const myClass = new MyClass();

    expect((<any>myClass).fn2).to.be.a('function');
    expect((<any>MyClass.prototype).fn2).to.be.a('function');
  });
});
