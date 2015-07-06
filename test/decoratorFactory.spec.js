'use strict';

import { expect } from 'chai';
import sinon from 'sinon';
import { createDecorator, createInstanceDecorator } from '../src/decoratorFactory';
import { applicators } from '../src/Applicator';

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
        wrapper = createDecorator(root[method], applicators.pre);
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
        wrapper = createDecorator(root[method], applicators.post);
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
        wrapper = createDecorator(root[method], applicators.partial);
        decorator = wrapper('test', arg);
        actual = decorator.call(context, target, name, descriptor);
        actual.value();
      });

      it('should call the method', () => {
        expect(root.method).to.have.been.calledWithExactly(target.test, arg);
      });

      it('should assign the result to the descriptor value', () => {
        expect(actual.value).to.equal(descriptor.value);
      });
    });

    describe('wrap', () => {
      let sourceValue;

      beforeEach(() => {
        target.test = () => null;
        sourceValue = descriptor.value;

        wrapper = createDecorator(root[method], applicators.wrap);
        decorator = wrapper('test', arg);
        actual = decorator.call(context, target, name, descriptor);
        actual.value();
      });

      it('should call the method', () => {
        expect(root.method).to.have.been.calledWithExactly(target.test, sourceValue);
      });

      it('should assign the result to the descriptor value', () => {
        expect(actual.value).to.equal(descriptor.value);
      });
    });

    describe('replace', () => {
      beforeEach(() => {
        wrapper = createDecorator(root[method], applicators.replace);
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
      let sourceValue;

      beforeEach(() => {
        target.test = () => null;
        target.test2 = () => null;
        sourceValue = descriptor.value;

        wrapper = createDecorator(root[method], applicators.compose);
        decorator = wrapper('test', 'test2');
        actual = decorator.call(context, target, name, descriptor);
        actual.value();
      });

      it('should call the method', () => {
        expect(root.method).to.have.been.calledWithExactly(sourceValue, target.test, target.test2);
      });

      it('should assign the result to the descriptor value', () => {
        expect(actual.value).to.equal(descriptor.value);
      });
    });

    describe('partialed', () => {
      let fn;

      beforeEach(() => {
        fn = descriptor.value;

        wrapper = createDecorator(root[method], applicators.partialed);
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
        decorator = createDecorator(root[method], applicators.single);
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
