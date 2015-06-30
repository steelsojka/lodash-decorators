# Extensions

Extensions are decorators that aren't necessarily Lodash functions, but use Lodash under the hood. They
provided some more niche utilities not found in Lodash;

## Usage

```javascript
import { Writable, ReturnsArg } from 'lodash-decorators/extensions';

class Person {
  constructor() {}

  @Writable(false)
  getName() {}

  @ReturnsArg(1)
  doSomething(x, y, z) {
    // Do something here
  }
}
```
