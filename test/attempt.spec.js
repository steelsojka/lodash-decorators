import { expect } from 'chai';
import { Attempt } from '../src';

describe('attempt', () => {
  let person;

  beforeEach(() => {
    class Person {
      @Attempt
      fn() {
        throw new Error('test');
      }

      @Attempt
      fn2() {
        return 10;
      } 
    }

    person = new Person();
  });

  it('should return an error', () => {
    expect(person.fn()).to.be.an.instanceof(Error);
  });

  it('should return a value', () => {
    expect(person.fn2()).to.equal(10);
  });
});
