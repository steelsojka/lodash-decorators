# lodash-decorators
ES7 Decorators for lodash functions.

[![Build Status](https://travis-ci.org/steelsojka/lodash-decorators.svg)](https://travis-ci.org/steelsojka/lodash-decorators)
[![npm version](https://badge.fury.io/js/lodash-decorators.svg)](http://badge.fury.io/js/lodash-decorators)

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
}
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

### Getters

When apply a decorator to a getter, a special annotation
is required to distinguish between a getter property and
an instance decorator.

- `getter`

#### Example

```javascript
import { getter, debounce } from 'lodash-decorators'

class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  @getter
  @debounce(100)
  get name() {
    return `${this.firstName} ${this.lastName}`;
  }
}
```

### Bind

Bind takes arguments based on lodash's bind and binds the `Function` to
the current instance object.

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

You can also bind entire classes.

#### Example

```javascript
import { bind } from 'lodash-decorators'

@bind()
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

Author: Steven Sojka
MIT Licensed
