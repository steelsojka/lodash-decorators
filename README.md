# lodash-decorators
ES7 Decorators for lodash functions.

[![Build Status](https://travis-ci.org/steelsojka/lodash-decorators.svg)](https://travis-ci.org/steelsojka/lodash-decorators)
[![npm version](https://badge.fury.io/js/lodash-decorators.svg)](http://badge.fury.io/js/lodash-decorators)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Install](#install)
- [Usage](#usage)
  - [With Arguments](#with-arguments)
    - [Example](#example)
  - [Without Arguments](#without-arguments)
    - [Example](#example-1)
  - [Partials](#partials)
    - [Example](#example-2)
  - [Composition](#composition)
    - [Example](#example-3)
  - [Instance Decorators](#instance-decorators)
  - [Mixin](#mixin)
    - [Example](#example-4)
  - [Attempt](#attempt)
    - [Example](#example-5)
  - [Bind](#bind)
    - [Example](#example-6)
    - [Example](#example-7)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Install

`npm install --save lodash-decorators`

## Usage

For more in depth documentation please visit [Lodash](http://lodash.com/docs)

### With Arguments

Many of the lodash decorators can contain arguments.

- `Debounce`
- `DebounceAll`
- `Throttle`
- `ThrottleAll`
- `Memoize`
- `MemoizeAll`
- `After`
- `AfterAll`
- `Before`
- `BeforeAll`
- `Ary`
- `Curry`
- `CurryAll`
- `CurryRight`
- `CurryRightAll`
- `Rest`
- `Partial`
- `PartialRight`
- `Wrap`
- `Flow`
- `FlowRight`
- `Delay`
- `Defer`
- `Bind`
- `BindAll`
- `OverArgs`
- `Rearg`
- `Mixin`
- `Attempt`

#### Example

```javascript
import { After, Debounce, Memoize, Curry } from 'lodash-decorators'

class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  @After(3)
  @Debounce(100)
  getFullName() {
    return `${this.firstName} ${this.lastName}`
  }

  @Curry(2)
  @Memoize()
  doSomeHeavyProcessing(arg1, arg2) {
  }
}
```

### Without Arguments

Some decorators don't take any arguments at all.

- `Once`
- `Spread`
- `Negate`
- `Tap`

#### Example

```javascript
import { Once } from 'lodash-decorators'

class person {
  constructor(firstname, lastname) {
    this.firstname = firstname;
    this.lastname = lastname;
  }

  @Once
  getfullname() {
    return `${this.firstname} ${this.lastname}`
  }

  @Tap
  popIt(list) {
    list.pop();
  }
}

const person = new Person();

person.popIt([1, 2, 3]); //=> [1, 2]
```

### Partials

Some decorators work slightly differently than you would expect
them to work than lodash.

- `Partial`
- `PartialRight`
- `Wrap`

These can take a `Function` as their first argument or a `String`.
If the argument is a `String` then a `Function` is resolved from
the current object.

#### Example

```javascript
import { Partial } from 'lodash-decorators'

class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  getName(type) {
    return type === 'firstName' ? this.firstName : this.lastName
  }

  @Partial('getName', 'firstName')
  getFirstName() {}

  @Partial('getName', null)
  getLastName() {}

  @Wrap('getName')
  getUpperCaseName(fn) {
    return fn().toUpperCase();
  }
}

const person = new Person('Joe', 'Smith');

person.getFirstName(); // 'Joe'
person.getLastName(); // 'Smith'
person.getUpperCaseName(); // JOE SMITH
```

### Composition

You can use methods like `compose` and `flow` similiar to
partials. The arguments are resolved the same way partials
are resolved.

#### Example

```javascript
import { Flow } from 'lodash-decorators'
import { kebabCase } from 'lodash';

class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  getName() {
    return `${this.firstName} ${this.lastName}`;
  }

  @Flow('getName', kebabCase)
  logName(name) {
    console.log(name);
  }
}

const person = new Person('Joe', 'Smith');

person.logName(); // joe-smith
```

### Instance Decorators

Normally decorators are applied to the prototype method
of the class you are working with, but with some of these
decorators that is not the desired behavour. These
decorators are applied at the instance level.

- `Debounce`
- `Throttle`
- `Memoize`
- `After`
- `Before`
- `Curry`
- `CurryRight`

### Mixin

You can mixin methods into a class by using the `Mixin` decorator.

#### Example

```javascript
import { Mixin } from 'lodash-decorators';

const MyOtherApi = {
  someCoolMethod() {
    // Do something cool
  }
};

@Mixin(MyOtherApi)
class Person {}

Person.prototype.someCoolMethod === MyOtherApi.someCoolMethod; // => true
```

### Attempt

You can wrap a method in a lodash attempt method.

#### Example

```javascript
import { Attempt } from 'lodash-decorators';

class Person {
  @Attempt()
  throwAnError() {
    throw new Error();
  }

  @Attempt()
  doNotThrowAnError() {
    return '0_o';
  }
}

const person = new Person();

let result = person.throwAnError();

result instanceof Error; // => true

result = person.doNotThrowAnError();

result === '0_o'; // => true
```

### Bind

Bind takes arguments based on lodash's bind and binds the `Function` to
the current instance object.

#### Example

```javascript
import { Bind } from 'lodash-decorators'

class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  @Bind()
  getName() {
    return `${this.firstName} ${this.lastName}`;
  }

  // It can also function as a partial
  @Bind('Joe')
  getUpperCaseName(name) {
    return name.toUpperCase();
  }
}

const person = new Person('Joe', 'Smith');

person.getName.call(null); // Joe Smith
person.getUpperCaseName(); // JOE
```

You can also bind entire classes with `bindAll` or `bind`.

#### Example

```javascript
import { BindAll } from 'lodash-decorators'

@BindAll()
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  getName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

const person = new Person('Joe', 'Smith');

person.getName.call(null); // Joe Smith
```

### v4 Breaking Changes

Version 4 is a rewrite of the library and has many breaking changes.

#### Decorators can only be applied to methods (with some exclusions)

This is a change that needed to happen and happened for good reason. 
  - In version 3 we had the ability to target whether a decorator was being applied to a getter/setter. This does not line up well with the decorator spec. A property decorator should apply to both the getter and the setter and not an individual
  - Having support for property decorators and instance decorators causes conflicts when applying multiple combinations of instance and prototype decorators. This resulted in unpredicatable behavior and being conscience of where a decorator was in the chain.
  - Most of the lodash decorators don't really make sense being added to properties.

#### Decorators are start case by default

You can import these as different names if you prefer lowercase.

```javascript
import { Debounce as debounce } from 'lodash-decorators';
```

or

```javascript
export {
  Debounce as debounce,
  Flow as flow,
  Memoize as memoize
} from 'lodash-decorators';
```

#### No longer force instance decorator onto prototype

There is no longer a `Proto` decorator attached to instance decorators. Most instance decorators now have a counterpart that applies to the prototype instead of the instance. `Debounce.Proto()` is now `DebounceAll()`.

#### Curry is now an instance decorator

The curry decorator is now an instance decorator in order to keep the calling context consistent. The original function before being curried is bound to the instance. You can apply curry to the prototype by using `CurryAll()`.

#### Removal of extensions and validation package

All extensions like `enumerable` have been removed in favor of [core-decorators](https://github.com/jayphelps/core-decorators.js). There may be some slight over lap like `debounce` and `throttle`. Fair warning, instance decorators may not play nice with other implementations of instance decorators.

We want to keep lodash decorators focused specifically on lodash specific functions.

#### Other breaking changes

- `Attempt` now takes an argument to line up with lodash API.
- `Bind` used on a class no longer delegates to `BindAll`. Use `BindAll` instead.

### v4 Improvements

- Instance and prototype decorators can be in any order.
- Ships with TypeScript typings.
- Predictable performance.
- Improvements to Bind decorator.
- Improved API for decorator factory.
- More and better unit tests.
- Better performance with instance decorators.
- Single imports with `import { Debounce } from 'lodash-decorators/debounce'`;

Author: Steven Sojka
MIT Licensed
