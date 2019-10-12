import { expect } from 'chai';

import { Unary as _Unary } from '../legacy/unary';
import { specFactory } from './specFactory';

export default specFactory<typeof _Unary>('unary', Unary => {
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

  it('should only invoke with one argument (paramless)', () => {
    class MyClass {
      @Unary
      fn(...args: any[]): any {
        expect(args.length).to.equal(1);
      }
    }

    const myClass = new MyClass();

    myClass.fn(1, 2, 3, 4);
  });
});
