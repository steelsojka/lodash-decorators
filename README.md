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
  - [Bind](#bind)
    - [Example](#example-5)
    - [Example](#example-6)
  - [Extensions](#extensions)
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
import { uniqueId } from 'lodash';
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

### Getters and Setters

Most decorators can be applied directly to getter and setter methods.

#### Example

```javascript
import { once } from 'lodash-decorators'
import _ from 'lodash';

class Person {
  constructor() {}

  @once
  get name() {
    return `${this.firstName} ${this.lastName}`;
  }

  @compose(_.trim)
  set name(name) {
    [this.firstName, this.lastName] = name.split(' ');
  }
}

const person = new Person();

person.name = '    Joe Smith   ';
person.name; //=> Joe Smith
```

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

### Extensions

Extensions are decorators that aren't necessarily Lodash functions, but use Lodash under the hood. They
provided some more basic utilities not found in Lodash;

These can be found in `src/extensions`

### Validate

The validate module contains decorators that can validate function arguments and return value.

These can be found in `src/validate`

Author: Steven Sojka
MIT Licensed
