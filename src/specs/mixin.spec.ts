import { expect } from 'chai';

import { Mixin as _Mixin } from '../legacy/mixin';
import { specFactory } from './specFactory';

export default specFactory<typeof _Mixin>('mixin', Mixin => {
  it('should mixin the object', () => {
    const myApi = {
      fn2() {}
    };

    @Mixin(myApi)
    class MyClass {
      fn() {}
    }

    const myClass = new MyClass();

    expect((myClass as any).fn2).to.be.a('function');
    expect((MyClass.prototype as any).fn2).to.be.a('function');
  });
});
