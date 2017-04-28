import { expect } from 'chai';

import { PartialRight } from './partialRight';

describe('partialRight', () => {
  it('should create a partially applied function', () => {
    class MyClass {
      firstName: string = 'Avry';

      @PartialRight('fn', 'Sojka')
      fn2: () => string;

      fn(name: string): string {
        return `${this.firstName} ${name}`;
      }
    }

    const myClass = new MyClass();

    expect(myClass.fn2).to.be.a('function');
    expect(myClass.fn2()).to.equal('Avry Sojka');
  });
});