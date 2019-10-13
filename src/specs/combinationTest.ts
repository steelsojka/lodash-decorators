import { expect } from 'chai';
import { spy } from 'sinon';

import { Bind as _Bind } from '../legacy/bind';
import { Memoize as _Memoize } from '../legacy/memoize';
import { Curry as _Curry } from '../legacy/curry';
import { Delay as _Delay } from '../legacy/delay';
import { specFactory } from './specFactory';

export default specFactory<
  typeof _Bind,
  typeof _Memoize,
  typeof _Curry,
  typeof _Delay
>('multiple decorators', (Bind, Memoize, Curry, Delay) => {
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

      expect(_spy.callCount).to.equal(2);
    });
  });

  describe('when combining proto and instance decorators', () => {
    it('should apply both decorators', done => {
      const _spy = spy();

      class MyClass {
        @Curry(2)
        @Delay(10)
        fn(n?: number, n2?: number): any {
          expect(this).to.equal(myClass);
          _spy(n, n2);
        }
      }

      const myClass = new MyClass();
      const add10 = myClass.fn(10);

      expect(_spy.called).to.be.false;

      add10(5);

      expect(_spy.called).to.be.false;

      setTimeout(() => {
        expect(_spy.callCount).to.equal(1);
        expect(_spy.getCalls()[0].args).to.eql([10, 5]);
        done();
      }, 20);
    });

    describe('when proto is after instance', () => {
      it('should only apply the instance decorator', () => {
        const _spy = spy();

        class MyClass {
          @Delay(10)
          @Curry(2)
          fn(n?: number, n2?: number): any {
            expect(this).to.equal(myClass);
            _spy(n, n2);
          }
        }

        const myClass = new MyClass();
        const add10 = myClass.fn(10);

        expect(_spy.called).to.be.false;

        add10(5);

        expect(_spy.called).to.be.true;
        expect(_spy.getCalls()[0].args).to.eql([10, 5]);
      });
    });
  });
});

