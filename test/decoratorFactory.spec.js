'use strict';

import { expect } from 'chai';
import sinon from 'sinon';
import { createDecorator, createInstanceDecorator } from '../src/decoratorFactory';

describe('decoratorFactory', () => {
  let sandbox, context, target, name, descriptor, wrapper, decorator;
  let root, method, type, arg, actual;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();

    descriptor = {
      value: sandbox.stub()
    };

    name = '';
    target = {};

    root = {
      method: sandbox.stub().returns(descriptor.value)
    };

    method = 'method';
    arg = {};
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('createDecorator', () => {
    describe('pre', () => {
      beforeEach(() => {
        wrapper = createDecorator(root, method, 'pre');
        decorator = wrapper(arg);
        actual = decorator.call(context, target, name, descriptor);
      });

      it('should call the method', () => {
        expect(root.method).to.have.been.calledWithExactly(descriptor.value, arg);
      });

      it('should assign the result to the descriptor value', () => {
        expect(actual.value).to.equal(descriptor.value);
      });
    });

    describe('post', () => {
      beforeEach(() => {
        wrapper = createDecorator(root, method, 'post');
        decorator = wrapper(arg);
        actual = decorator.call(context, target, name, descriptor);
      });

      it('should call the method', () => {
        expect(root.method).to.have.been.calledWithExactly(arg, descriptor.value);
      });

      it('should assign the result to the descriptor value', () => {
        expect(actual.value).to.equal(descriptor.value);
      });
    });

    describe('partial', () => {
      beforeEach(() => {
        target.test = () => null;
        wrapper = createDecorator(root, method, 'partial');
        decorator = wrapper('test', arg);
        actual = decorator.call(context, target, name, descriptor);
      });

      it('should call the method', () => {
        expect(root.method).to.have.been.calledWithExactly(target.test, arg);
      });

      it('should assign the result to the descriptor value', () => {
        expect(actual.value).to.equal(descriptor.value);
      });
    });

    describe('wrap', () => {
      beforeEach(() => {
        target.test = () => null;
        wrapper = createDecorator(root, method, 'wrap');
        decorator = wrapper('test', arg);
        actual = decorator.call(context, target, name, descriptor);
      });

      it('should call the method', () => {
        expect(root.method).to.have.been.calledWithExactly(target.test, descriptor.value);
      });

      it('should assign the result to the descriptor value', () => {
        expect(actual.value).to.equal(descriptor.value);
      });
    });

    describe('replace', () => {
      beforeEach(() => {
        wrapper = createDecorator(root, method, 'replace');
        decorator = wrapper(arg);
        actual = decorator.call(context, target, name, descriptor);
      });

      it('should call the method', () => {
        expect(root.method).to.have.been.calledWithExactly(arg);
      });

      it('should assign the result to the descriptor value', () => {
        expect(actual.value).to.equal(descriptor.value);
      });
    });

    describe('compose', () => {
      beforeEach(() => {
        target.test = () => null;
        target.test2 = () => null;

        wrapper = createDecorator(root, method, 'compose');
        decorator = wrapper('test', 'test2');
        actual = decorator.call(context, target, name, descriptor);
      });

      it('should call the method', () => {
        expect(root.method).to.have.been.calledWithExactly(descriptor.value, target.test, target.test2);
      });

      it('should assign the result to the descriptor value', () => {
        expect(actual.value).to.equal(descriptor.value);
      });
    });

    describe('partialed', () => {
      let fn;

      beforeEach(() => {
        fn = descriptor.value;

        wrapper = createDecorator(root, method, 'partialed');
        decorator = wrapper(arg);
        actual = decorator.call(context, target, name, descriptor);
        actual.value();
      });

      it('should call the method', () => {
        expect(root.method).to.have.been.calledWithExactly(fn, arg);
      });

      it('should assign the result to the descriptor value', () => {
        expect(actual.value).to.be.a.func;
      });
    });

    describe('single', () => {
      beforeEach(() => {
        decorator = createDecorator(root, method, 'single');
        actual = decorator.call(context, target, name, descriptor);
      });

      it('should call the method', () => {
        expect(root.method).to.have.been.calledWithExactly(descriptor.value);
      });

      it('should assign the result to the descriptor value', () => {
        expect(actual.value).to.equal(descriptor.value);
      });
    });
  });
});
