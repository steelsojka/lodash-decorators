import sinon from 'sinon';
import { expect } from 'chai';
import wrapConstructor from '../../src/utils/wrapConstructor';

describe('utils.wrapConstructor', () => {
  let sandbox, Ctor, spy;

  class Person {
    constructor() {}

    static testFn() {}
  }

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    spy = sandbox.spy();
    Ctor = wrapConstructor(Person, spy);
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should wrap the constructor', () => {
    let arg = {};
    let instance = new Ctor(arg);

    expect(spy).to.have.been.calledWith(Person, arg);
  });

  it('should retain the prototype', () => {
    expect(Ctor.prototype).to.equal(Person.prototype);
  });

  it('should retain instanceof check', () => {
    let instance = new Ctor();

    expect(instance).to.be.an.instanceof(Person);
    expect(instance).to.be.an.instanceof(Ctor);
  });

  it('should copy over static methods', () => {
    expect(Ctor.testFn).to.be.a.func;
    expect(Ctor.testFn).to.equal(Person.testFn);
  });
});
