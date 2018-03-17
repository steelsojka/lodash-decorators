import { expect } from 'chai';
import { spy } from 'sinon';

import { MemoizeAll } from './memoizeAll';

describe('memoizeAll', () => {
  it('should memoize the function', () => {
    const _spy = spy();

    class MyClass {
      @MemoizeAll()
      fn(n: number): number {
        _spy(n);
        expect(this, 'context').to.equal(myClass);

        return n;
      }
    }

    const myClass = new MyClass();
    const myClass2 = new MyClass();

    myClass.fn(1);
    myClass.fn(1);
    myClass.fn(1);
    myClass2.fn(1);
    myClass2.fn(1);
    myClass2.fn(1);

    expect(_spy.callCount).to.equal(1);
  });

  it('should memoize the function (paramless)', () => {
    const _spy = spy();

    class MyClass {
      @MemoizeAll
      fn(n: number): number {
        _spy(n);
        expect(this, 'context').to.equal(myClass);

        return n;
      }
    }

    const myClass = new MyClass();
    const myClass2 = new MyClass();

    myClass.fn(1);
    myClass.fn(1);
    myClass.fn(1);
    myClass2.fn(1);
    myClass2.fn(1);
    myClass2.fn(1);

    expect(_spy.callCount).to.equal(1);
  });

  describe('with function resolver', () => {
    it('should resolve the key', () => {
      const _spy = spy();

      class MyClass {
        @MemoizeAll((i: any) => i.key)
        fn(item: any): any {
          _spy();
          expect(this, 'context').to.equal(myClass);

          return item.value;
        }
      }

      const myClass = new MyClass();
      const myClass2 = new MyClass();

      myClass.fn({ key: 'test', value: 10 });
      myClass.fn({ key: 'test', value: 20 });
      myClass.fn({ key: 'test', value: 30 });
      myClass2.fn({ key: 'test', value: 40 });
      myClass2.fn({ key: 'test', value: 50 });

      expect(myClass.fn({ key: 'test', value: 50 })).to.equal(10);
      expect(_spy.callCount).to.equal(1);
    });
  });
});
