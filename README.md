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
  - [Getters and Setters](#getters-and-setters)
    - [Example](#example-4)
    - [What's with the `.get`?](#whats-with-the-get)
    - [Can I use decorators on getters/setters without these?](#can-i-use-decorators-on-getterssetters-without-these)
  - [Bind](#bind)
    - [Example](#example-5)
    - [Example](#example-6)
  - [Forcing Decorator on Prototype](#forcing-decorator-on-prototype)
    - [Example](#example-7)
- [Extensions](#extensions)
  - [Deprecated](#deprecated)
    - [Example](#example-8)
- [Validate](#validate)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Install

`npm install --save lodash-decorators`

## Usage

For more in depth documentation please visit [Lodash](http://lodash.com/docs)

### With Arguments

Many of the lodash decorators can contain arguments.

- `debounce`
- `throttle`
- `memoize`
- `after`
- `before`
- `ary`
- `curry`
- `curryRight`
- `restParam`
- `partial`
- `partialRight`
- `wrap`
- `compose`
- `flow`
- `flowRight`
- `backflow`
- `delay`
- `defer`
- `bind`
- `bindAll`
- `modArgs`

#### Example

```javascript
import { after, debounce, memoize, curry } from 'lodash-decorators'

class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  @after(3)
  @debounce(100)
  getFullName() {
    return `${this.firstName} ${this.lastName}`
  }

  @curry(2)
  @memoize()
  doSomeHeavyProcessing(arg1, arg2) {
  }
}
```

### Without Arguments

Some decorators don't take any arguments at all.

- `once`
- `spread`
- `rearg`
- `negate`
- `tap`

#### Example

```javascript
import { once } from 'lodash-decorators'

class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  @once
  getFullName() {
    return `${this.firstName} ${this.lastName}`
  }

  @tap
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

- `partial`
- `partialRight`
- `wrap`

These can take a `Function` as their first argument or a `String`.
If the argument is a `String` then a `Function` is resolved from
the current object.

#### Example

```javascript
import { partial } from 'lodash-decorators'

class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  getName(type) {
    return type === 'firstName' ? this.firstName : this.lastName
  }

  @partial('getName', 'firstName')
  getFirstName() {}

  @partial('getName', null)
  getLastName() {}

  @wrap('getName')
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
import { compose } from 'lodash-decorators'
import { kebabCase } from 'lodash';

class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  getName() {
    return `${this.firstName} ${this.lastName}`;
  }

  @compose(kebabCase, 'getName')
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

- `debounce`
- `throttle`
- `memoize`
- `after`
- `before`

__Note__: Due to the nature of how instance decorators work they MUST be processed
after all prototype decorators in the decorator chain. There isn't a graceful way
to get around this currently. More or less instance decorators are kind of a hack and experimental.

```javascript
class Person {

  @curry(2) // <= prototype decorator
  @debounce(100) // <= instance decorator
  getName() {} //=> Throws an error. (╯°□°）╯︵ ┻━┻

  @debounce(100) // <= instance decorator
  @curry(2) // <= prototype decorator
  getName2() {} //=> All is well :)
}
```

### Getters and Setters

Most decorators can be applied directly to getter and setter methods.

#### Example

```javascript
import { once, compose } from 'lodash-decorators'
import _ from 'lodash';

function alwaysArray(value) {
  return Array.isArray(value) ? value : _.isUndefined(value) ? [] : [value];
}

class Person {
  constructor() {}

  @once.get
  get names() {
    return this.nameList.join(' ');
  }

  @compose.set(alwaysArray)
  set names(names) {
    this.nameList = names;
  }
}

const person = new Person();

// nameList will always be an array.
person.names = undefined; //=> []
person.names = 'Joe'; //=> ['Joe']
person.names = ['Jim']; //=> ['Jim']
```

#### What's with the `.get`?

The decorator has no way to tell whether you are applying the decorator to the getter or setter (when both are provided).
The decorator just receives the descriptor which has both values provided and no way to distinguish which one you are provided
which decorator to.

`@once.get` uses a form of the decorator that explicitly applies to the getter method.
`@once.set` uses a form of the decorator that explicitly applies to the setter method.

#### Can I use decorators on getters/setters without these?

Use at you're own risk...

### Bind

Bind takes arguments based on lodash's bind and binds the `Function` to
the current instance object.

__Known Issue__: When using bind on a single method the bind decorator MUST come last
in the chain of decorators. There is no graceful solution for this currently. You can always
use `@bindAll('fn')` on the class and only include the functions you want to include.

#### Example

```javascript
import { bind } from 'lodash-decorators'

class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  @bind()
  getName() {
    return `${this.firstName} ${this.lastName}`;
  }

  // It can also function as a partial
  @bind('Joe')
  getUpperCaseName(name) {
    return name.toUpperCase();
  }
}

const person = new Person('Joe', 'Smith');

person.getName.call(null); // Joe Smith
person.getUpperCaseName(); // JOE
```

You can also bind entire classes with `bindAll` or `bind`.

__Note__: Using `@bind()` on a class delegates to the `@bindAll()` implemenation.


#### Example

```javascript
import { bind } from 'lodash-decorators'

@bindAll()
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

### Forcing Decorator on Prototype

You can force an instance decorator to apply to the prototype instead of the instance.

#### Example

```javascript
import { Throttle } from 'lodash-decorators';

class Person {
  @throttle(1000)
  doStuff() {}

  @throttle.proto(1000)
  doStuffMore() {}
}

const person = new Person();
const person2 = new Person();

person.doStuff(); //=> Both are called
person2.doStuff();

person.doStuffMore(); 
person2.doStuffMore();

// Only one of these methods is actual invoked because throttle is applied to the prototype method
// and not the instance method.
```

## Extensions

Extensions are decorators that aren't necessarily Lodash functions, but use Lodash under the hood. They
provided some more basic utilities not found in Lodash;

- `deprecated`
- `writable`
- `configurable`
- `returnsArg`
- `enumerable`
- `nonenumerable` -> `enumerable(false)`
- `nonconfigurable` -> `configurable(false)`
- `readonly` -> `writable(false)`

### Deprecated

Warns when a deprecated class is istantiated or a deprecated class method is invoked.
You can also modify the deprecated behaviour by swapping out the method and class actions.

#### Example

```javascript
import { deprecated } from 'lodash-decorators/extensions'

// This is applied globally.
deprecated.methodAction = fn => console.log(`Don't use ${fn.name}!`);

@deprecated
class Person {
  constructor() {}
}

class OtherPerson {
  @deprecated
  fn() {}
}

let person = new Person(); //=> Warning!

let otherPerson = new OtherPerson();
otherPerson.fn(); //=> Don't use fn!
```

## Validate

The validate module contains decorators that can validate function arguments and return value.

These can be found in `src/validate`

Author: Steven Sojka
MIT Licensed
