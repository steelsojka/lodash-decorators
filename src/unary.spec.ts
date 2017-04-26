import { expect } from 'chai';

import { Unary } from './unary';

describe('unary', () => {
  it('should only invoke with one argument', () => {
    class MyClass {
      @Unary()
      fn(...args: any[]): any {
        expect(args.length).to.equal(1);
      }
    }

    const myClass = new MyClass();

    myClass.fn(1, 2, 3, 4);
  });
});