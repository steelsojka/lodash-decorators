import { expect } from 'chai';

import { OverArgs as _OverArgs } from '../legacy/overArgs';
import { specFactory } from './specFactory';

const add = (n: number) => (v: number) => v + n;

export default specFactory<typeof _OverArgs>('overArgs', OverArgs => {
  it('should transform each argument', () => {
    class MyClass {
      @OverArgs(add(10), add(5))
      fn(a: number, b: number): [number, number] {
        return [a, b];
      }
    }

    const myClass = new MyClass();

    expect(myClass.fn(5, 50)).to.eql([15, 55]);
  });
});

