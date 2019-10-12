import { expect } from 'chai';

import { isMethodOrPropertyDecoratorArgs } from './isDecoratorArgs';

describe('when determining if args are from a decorator', () => {
  describe('and when the arguments are gte to 2', () => {
    describe('and when the first argument is an object', () => {
      describe('and when the second argument is a string', () => {
        describe('and when the first argument has a constructor property', () => {
          describe('and when the constructors prototype is the first argument', () => {
            it('should return true', () => {
              class Test {}

              expect(isMethodOrPropertyDecoratorArgs(Test.prototype, 'test')).to
                .be.true;
            });
          });

          describe('and when the constructors prototype is not the first argument', () => {
            it('should return false', () => {
              class Test {}

              expect(
                isMethodOrPropertyDecoratorArgs({ constructor: Test }, 'test')
              ).to.be.false;
            });
          });
        });

        describe('and when the first argument does not have a constructor property', () => {
          it('should return false', () => {
            expect(isMethodOrPropertyDecoratorArgs({}, 'test')).to.be.false;
          });
        });
      });

      describe('and when the second argument is not a string', () => {
        it('should return false', () => {
          expect(isMethodOrPropertyDecoratorArgs({}, 123)).to.be.false;
        });
      });
    });

    describe('and when the first argument is not an object', () => {
      it('should return false', () => {
        expect(isMethodOrPropertyDecoratorArgs(true, 123)).to.be.false;
      });
    });
  });

  describe('and when the arguments are gte to 2', () => {
    it('should return false', () => {
      class Test {}

      expect(isMethodOrPropertyDecoratorArgs(Test.prototype)).to.be.false;
    });
  });
});
