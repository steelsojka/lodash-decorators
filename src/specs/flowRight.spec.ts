import { expect } from 'chai';

import { FlowRight as _FlowRight } from '../legacy/flowRight';
import { specFactory } from './specFactory';

export default specFactory<typeof _FlowRight>('flowRight', FlowRight => {
  it('should compose the functions', () => {
    class MyClass {
      name = 'Avry';

      @FlowRight((v: string) => v.toUpperCase(), 'getName')
      fn(...args: any[]) {
        return args[0];
      }

      getName(): string {
        expect(this, 'context').to.equal(myClass);

        return this.name;
      }
    }

    const myClass = new MyClass();

    expect(myClass.fn()).to.equal('AVRY');
  });

  it('should compose the property', () => {
    class MyClass {
      name = 'Avry';

      @FlowRight((v: string) => v.toUpperCase(), 'getName')
      fn: () => string;

      getName(): string {
        expect(this, 'context').to.equal(myClass);

        return this.name;
      }
    }

    const myClass = new MyClass();

    expect(myClass.fn()).to.equal('AVRY');
  });
});
