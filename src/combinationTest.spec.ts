import { expect } from 'chai';
import { spy } from 'sinon';

import { Bind } from './bind';
import { Memoize } from './memoize';
import { Curry } from './curry';
import { Delay } from './delay';

describe('multiple decorators', () => {
  describe('when using multiple instance decorators', () => {
    it('should apply both decorators', () => {
      const _spy = spy(); 

      class MyClass {
        @Bind()
        @Memoize()
        fn(n: number) {
          expect(this).to.equal(myClass);
          _spy();
        }
      }

      const myClass = new MyClass();

      myClass.fn.call(null, 1);
      myClass.fn.call(null, 2);

      myClass.fn.call(null, 1);
      myClass.fn.call(null, 2);

      expect(_spy.callCount).to.equal(2)
    });
  });

  describe('when combining proto and instance decorators', () => {
    it.only('should apply both decorators', () => {
      const _spy = spy(); 

      class MyClass {
        @Curry()
        @Delay(10)
        fn(n: number) {
          expect(this).to.equal(myClass);
          _spy();
        }
      }

      const myClass = new MyClass();

      myClass.fn(10);
    });
  });
});