# Validate
This module allows you to *validate* the arguments of a function using
*lodash lang* methods or any function for that matter.

```javascript
import Validate from 'lodash-decorators/validate';
import _ from 'lodash';

class Person {
  constructor() {}

  @Validate(_.isString)
  setName(name) {
    this.name = name;
  }
}
```

The index of the argument to `Validate` corresponds to the index of ths argument to validate.
An `Array<Function>` can be used for multiple validators to an argument.

```javascript
import Validate from 'lodash-decorators/validate';
import _ from 'lodash';

class Person {
  constructor() {}

  @Validate(
    _.isString,
    [_.isNumber, _.partial(_.lt, 10)]
  )
  setData(name, age) {
    this.name = name;
    this.age = age;
  }
}

const person = new Person();

person.setData('test', 5); //=> TypeError
person.setData('test', 12); //=> Valid
```

If an argument does not pass validation, a TypeError is thrown.
