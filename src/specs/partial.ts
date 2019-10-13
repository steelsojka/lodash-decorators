import { expect } from 'chai';

import { Partial as _Partial } from '../legacy/partial';
import { specFactory } from './specFactory';

export default specFactory<typeof _Partial>('partial', Partial => {
  it('should create a partially applied function', () => {
    class MyClass {
      lastName: string = 'Schmo';

      @Partial('fn', 'Joe')
      fn2: () => string;

      fn(name: string): string {
        return `${name} ${this.lastName}`;
      }
    }

    const myClass = new MyClass();

    expect(myClass.fn2).to.be.a('function');
    expect(myClass.fn2()).to.equal('Joe Schmo');
  });
});
