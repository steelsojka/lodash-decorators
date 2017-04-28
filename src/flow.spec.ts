import { expect } from 'chai';

import { Flow } from './flow';

describe('flow', () => {
  it('should compose the functions', () => {
    class MyClass {
      name = 'Avry';

      @Flow('getName', (v: string) => v.toUpperCase())
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

  it('should compose and assign to the property', () => {
    class MyClass {
      name = 'Avry';

      @Flow('getName', (v: string) => v.toUpperCase())
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
