import { expect } from 'chai';

import { BindAll as _BindAll } from '../legacy/bindAll';
import { Debounce as _Debounce } from '../legacy/debounce';
import { specFactory } from './specFactory';

export default specFactory<typeof _BindAll, typeof _Debounce>(
  'bindAll',
  (BindAll, Debounce) => {
    it('should bind all method to the context', () => {
      let context;

      class Parent {
        fn() {
          context = this;
        }
      }

      @BindAll()
      class MyClass extends Parent {
        fn2() {
          context = this;
        }
      }

      const myClass = new MyClass();

      myClass.fn.call(null);
      expect(context).to.equal(myClass);

      myClass.fn2.call(null);
      expect(context).to.equal(myClass);
    });

    it('should bind only specified methods to the context', () => {
      let context;

      class Parent {
        fn() {
          context = this;
        }
      }

      @BindAll(['fn'])
      class MyClass extends Parent {
        fn2() {
          context = this;
        }
      }

      const myClass = new MyClass();

      myClass.fn.call(null);
      expect(context).to.equal(myClass);

      myClass.fn2.call(null);
      expect(context).to.equal(null);
    });

    it('should work with getters', () => {
      @BindAll()
      class MyClass {
        get prop(): string {
          return 'blorg';
        }

        fn() {
          return this.prop;
        }
      }

      const myClass = new MyClass();

      myClass.fn.call(null);
      expect(myClass.fn()).to.equal('blorg');
    });

    it('should not access getters that are not decorated', () => {
      let accessed = false;

      @BindAll()
      class MyClass {
        get prop(): string {
          accessed = true;

          return 'blorg';
        }

        @Debounce()
        get prop2(): string {
          return 'test';
        }

        @Debounce(1)
        fn() {
          return this.prop;
        }
      }

      const myClass = new MyClass();

      expect(accessed).to.be.false;
      expect(myClass.hasOwnProperty('prop')).to.be.false;
      expect(myClass.hasOwnProperty('prop2')).to.be.false;
    });

    it('should copy over any static properties on the constructor', () => {
      @BindAll()
      class MyClass {
        static $inject = [];
      }

      expect(MyClass.$inject).to.be.an('array');
    });

    it('should pass babels class call check', () => {
      function classCallCheck(instance: any, Constructor: any): void {
        if (!(instance instanceof Constructor)) {
          throw new TypeError('Cannot call a class as a function');
        }
      }

      @BindAll()
      class MyClass {
        constructor() {
          classCallCheck(this, MyClass);
        }
      }

      expect(() => new MyClass()).not.to.throw();
    });
  }
);
