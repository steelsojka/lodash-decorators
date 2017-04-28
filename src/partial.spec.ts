import { expect } from 'chai';

import { Partial } from './partial';

describe('partial', () => {
  it('should create a partially applied function', () => {
    class MyClass {
      lastName: string = 'Sojka';

      @Partial('fn', 'Avry')
      fn2: () => string;

      fn(name: string): string {
        return `${name} ${this.lastName}`;
      }
    }

    const myClass = new MyClass();

    expect(myClass.fn2).to.be.a('function');
    expect(myClass.fn2()).to.equal('Avry Sojka');
  });
});