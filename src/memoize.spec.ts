import { expect } from 'chai';
import { spy } from 'sinon';

import { Memoize } from './memoize';

describe('memoize', () => {
  it('should memoize the function', () => {
    const _spy = spy();

    class MyClass {
      @Memoize()
      fn(n: number): number {
        _spy(n);
        expect(this, 'context').to.equal(myClass);

        return n;
      }
    }

    const myClass = new MyClass();

    myClass.fn(1);
    myClass.fn(1);
    myClass.fn(1);
    myClass.fn(1);
    myClass.fn(1);

    expect(myClass.fn(1)).to.equal(1);
    expect(_spy.callCount).to.equal(1);

    myClass.fn(2);
    myClass.fn(2);

    expect(myClass.fn(2)).to.equal(2);
    expect(_spy.callCount).to.equal(2);
  });

  describe('with function resolver', () => {
    it('should resolve the key', () => {
      const _spy = spy();

      class MyClass {
        @Memoize((item: any) => item.key)
        fn(item: any): any {
          _spy();
          expect(this, 'context').to.equal(myClass);

          return item.value;
        }
      }

      const myClass = new MyClass();

      myClass.fn({ key: 'test', value: 10 });
      myClass.fn({ key: 'test', value: 20 });
      myClass.fn({ key: 'test', value: 30 });

      expect(myClass.fn({ key: 'test', value: 50 })).to.equal(10);
      expect(_spy.callCount).to.equal(1);

      myClass.fn({ key: 'test2', value: 30 });

      expect(myClass.fn({ key: 'test2', value: 50 })).to.equal(30);
      expect(_spy.callCount).to.equal(2);
    });
  });

  describe('with string resolver', () => {
    it('should resolve the key', () => {
      const _spy = spy();

      class MyClass {
        @Memoize('resolve')
        fn(item: any): any {
          _spy();
          expect(this, 'context').to.equal(myClass);

          return item.value;
        }

        resolve(item: any): any {
          expect(this, 'resolver context').to.equal(myClass);

          return item.key;
        }
      }

      const myClass = new MyClass();

      myClass.fn({ key: 'test', value: 10 });
      myClass.fn({ key: 'test', value: 20 });
      myClass.fn({ key: 'test', value: 30 });

      expect(myClass.fn({ key: 'test', value: 50 })).to.equal(10);
      expect(_spy.callCount).to.equal(1);

      myClass.fn({ key: 'test2', value: 30 });

      expect(myClass.fn({ key: 'test2', value: 50 })).to.equal(30);
      expect(_spy.callCount).to.equal(2);
    });
  });

  describe('with custom map type', () => {
    it('should create the map of type', () => {
      class MyClass {
        @Memoize({ type: WeakMap })
        fn(item: any): any {
          return item.value;
        }
      }

      const myClass = new MyClass();

      expect((myClass.fn as any).cache).to.be.an.instanceOf(WeakMap);
    });
  });

  describe('with custom cache', () => {
    it('should use the provided map', () => {
      const cache = new Map();

      class MyClass {
        @Memoize({ cache })
        fn(item: any): any {
          return item.value;
        }
      }

      const myClass = new MyClass();
      const myClass2 = new MyClass();

      expect((myClass.fn as any).cache).to.equal(cache);
      expect((myClass2.fn as any).cache).to.equal(cache);
    });
  });
});