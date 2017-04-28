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

      expect(_spy.callCount).to.equal(2);
    });
  });

  describe('when combining proto and instance decorators', () => {
    it('should apply both decorators', (done) => {
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
        expect(_spy.getCalls()[0].args).to.eql([ 10, 5 ]);
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
        expect(_spy.getCalls()[0].args).to.eql([ 10, 5 ]);
      });
    });
  });
});