# lodash-decorators

Decorators using lodash functions. View the [API docs](https://steelsojka.github.io/lodash-decorators) for more in depth documentation.

[![Build Status](https://travis-ci.org/steelsojka/lodash-decorators.svg)](https://travis-ci.org/steelsojka/lodash-decorators)
[![npm version](https://badge.fury.io/js/lodash-decorators.svg)](http://badge.fury.io/js/lodash-decorators)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Install](#install)
  - [Polyfills](#polyfills)
- [Usage](#usage)
  - [Decorators](#decorators)
    - [Example](#example)
  - [Optional Params and Casing](#optional-params-and-casing)
    - [Example](#example)
  - [Partials](#partials)
    - [Example](#example-1)
  - [Composition](#composition)
    - [Example](#example-2)
  - [Instance Decorators](#instance-decorators)
  - [Mixin](#mixin)
    - [Example](#example-3)
  - [Attempt](#attempt)
    - [Example](#example-4)
  - [Bind](#bind)
    - [Example](#example-5)
    - [Example](#example-6)
  - [v4 Breaking Changes](#v4-breaking-changes)
    - [Not all decorators can be applied to or forced on getters/setters.](#not-all-decorators-can-be-applied-to-or-forced-on-getterssetters)
    - [No longer force instance decorator onto prototype](#no-longer-force-instance-decorator-onto-prototype)
    - [All decorators now take arguments](#all-decorators-now-take-arguments)
    - [Removal of extensions and validation package](#removal-of-extensions-and-validation-package)
    - [Prototype decorator order no longer throws an error](#prototype-decorator-order-no-longer-throws-an-error)
    - [Other breaking changes](#other-breaking-changes)
  - [v4 Improvements](#v4-improvements)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Install

`npm install --save lodash lodash-decorators`

### Polyfills

This library requires `Map` and `WeakMap` to be available globally. If `Map` or `WeakMap` is not supported in your environment then use a polyfill.

## Usage

For more in depth documentation please visit [Lodash](http://lodash.com/docs)

Decorators are exported as both start case and lower case.

`import { Debounce } from 'lodash-decorators';`

is the same as

`import { debounce } from 'lodash-decorators';`

They can also be imported directly.

`import Debounce from 'lodash-decorators/debounce';`

### Decorators

These decorators are included in the package. These are also exported as lowercase for those who prefer lowercase decorators.

-   `After`
-   `AfterAll`
-   `Ary`
-   `Attempt`
-   `Before`
-   `BeforeAll`
-   `Bind`
-   `BindAll`
-   `Curry`
-   `CurryAll`
-   `CurryRight`
-   `CurryRightAll`
-   `Debounce`
-   `DebounceAll`
-   `Defer`
-   `Delay`
-   `Flip`
-   `Flow`
-   `FlowRight`
-   `Memoize`
-   `MemoizeAll`
-   `Mixin`
-   `Negate`
-   `Once`
-   `OnceAll`
-   `OverArgs`
-   `Partial`
-   `PartialRight`
-   `Rearg`
-   `Rest`
-   `Spread`
-   `Tap`
-   `Throttle`
-   `ThrottleAll`
-   `ThrottleGetter`
-   `ThrottleSetter`
-   `Unary`
-   `Wrap`

#### Example

```javascript
import { Debounce, Memoize } from 'lodash-decorators';

class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  @Debounce(100)
  save(date) {
    return this.httpService.post(data);
  }

  @Memoize(item => item.id)
  doSomeHeavyProcessing(arg1, arg2) {}
}
```

### Optional Params and Casing

If a decorator does not require params or has optional params then the decorator does not require invocation.
Decorators are also exported in lower case as well as start case.

#### Example

```javascript
// These are both valid decorator usages.
class Person {
  @Memoize()
  doSomething() {}

  @Memoize
  doSomething2() {}

  @memoize()
  doSomething3() {}

  @memoize
  doSomething4() {}
}
```

### Partials

Some decorators work slightly differently than you would expect
them to work than lodash.

-   `Partial`
-   `PartialRight`
-   `Wrap`

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
  @Flow('getName', kebabCase)
  logName;

  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  getName() {
    return `${this.firstName} ${this.lastName}`;
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

-   `Debounce`
-   `Throttle`
-   `Memoize`
-   `After`
-   `Before`
-   `Curry`
-   `CurryRight`
-   `Once`
-   `Flow`
-   `FlowRight`
-   `Rearg`
-   `Negate`
-   `Flip`
-   `Bind`
-   `Partial`
-   `PartialRight`

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

#### Not all decorators can be applied to or forced on getters/setters.

Only certain decorators make sense to be applied to getters/setters. Before you could specify the target of the decorator like `debounce.set(15)`. This behavior is
removed and decorators that make sense to apply to getters/setters are configured to be applied to methods and either the getter or the setter. For example:

```javascript
class MyClass {
  // This only gets applied to the setter as it doesn't make sense to apply it to the getter.
  @Debounce(1000)
  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
  }

  @Debounce(15)
  fn() {}
}
```

This keeps the API cleaner and doesn't require the developer to know how the decorator applies to the descriptor. Some decorators have explicit version that apply to either getters of setters, such as `ThrottleGetter` and `ThrottleSetter`.

#### No longer force instance decorator onto prototype

There is no longer a `Proto` decorator attached to instance decorators. Most instance decorators now have a counterpart that applies to the prototype instead of the instance. `Debounce.Proto()` is now `DebounceAll()`.

#### All decorators now take arguments

All decorators now take arguments. So instead of `@Once` you would do `@Once()`. This keeps the API consistent and doesn't require the developer to remember which decorators take arguments.

#### Removal of extensions and validation package

All extensions like `enumerable` have been removed in favor of [core-decorators](https://github.com/jayphelps/core-decorators.js). There may be some slight over lap like `debounce` and `throttle`. Fair warning, instance decorators may not play nice with other implementations of instance decorators.

We want to keep lodash decorators focused specifically on lodash specific functions.

#### Prototype decorator order no longer throws an error

If a prototype decorator comes after an instance decorator it will be ignored since there is no way to apply it in the chain.

#### Other breaking changes

-  `Attempt` now takes an argument to line up with lodash API.
-  `Bind` used on a class no longer delegates to `BindAll`. Use `BindAll` instead.
-  `Curry`, `Partial`, `Flow`, `FlowRight` are now instance decorators.

### v4 Improvements

-   Ships with TypeScript typings.
-   Predictable performance.
-   Improvements to Bind decorator.
-   Improved API for decorator factory.
-   More and better unit tests.
-   Better performance with instance decorators.
-   Single imports with `import { Debounce } from 'lodash-decorators/debounce'`;
-   Composition decorators can be used on properties. These will generate the composed function.
