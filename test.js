'use strict';

var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _chai = require('chai');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _src = require('../src');

describe.only('spread', function () {
  var person = undefined,
      method = undefined;

  var Person = (function () {
    function Person() {
      _classCallCheck(this, Person);
    }

    _createDecoratedClass(Person, [{
      key: 'fn',
      decorators: [_src.spread],
      value: function fn() {}
    }]);

    return Person;
  })();

  beforeEach(function () {
    _sinon2['default'].stub(_lodash2['default'], 'spread').returnsArg(0);
    method = Person.prototype.fn;
    person = new Person();
  });

  it('should call the function', function () {
    (0, _chai.expect)(_lodash2['default'].spread).to.have.been.calledWith(method);
  });
});
