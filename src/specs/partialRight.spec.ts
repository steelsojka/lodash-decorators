import { expect } from 'chai';

import { PartialRight as _PartialRight } from '../legacy/partialRight';
import { specFactory } from './specFactory';

export default specFactory<typeof _PartialRight>(
  'partialRight',
  PartialRight => {
    it('should create a partially applied function', () => {
      class MyClass {
        firstName: string = 'Avry';

        @PartialRight('fn', 'Sojka')
        fn2: () => string;

        fn(name: string): string {
          return `${this.firstName} ${name}`;
        }
      }

      const myClass = new MyClass();

      expect(myClass.fn2).to.be.a('function');
      expect(myClass.fn2()).to.equal('Avry Sojka');
    });
  }
);

