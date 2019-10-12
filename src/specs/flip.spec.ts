import { expect } from 'chai';

import { Flip as _Flip } from '../legacy/flip';
import { specFactory } from './specFactory';

export default specFactory<typeof _Flip>('flip', Flip => {
  it('should flip the arguments of the function', () => {
    class MyClass {
      @Flip()
      fn(a: number, b: number) {
        return [a, b];
      }
    }

    const myClass = new MyClass();

    expect(myClass.fn(10, 20)).to.eql([20, 10]);
  });

  it('should flip the arguments of the resolved function', () => {
    class MyClass {
      @Flip('fn')
      fn2: (b: number, a: number) => [number, number];

      fn(a: number, b: number) {
        return [a, b];
      }
    }

    const myClass = new MyClass();

    expect(myClass.fn2(10, 20)).to.eql([20, 10]);
  });
});
