import configurable from './configurable';
import enumerable from './enumerable';
import returnsArg from './returnsArg';
import writable from './writable';
import deprecated from './deprecated';

export { configurable };
export { enumerable };
export { returnsArg };
export { writable };
export { deprecated };
export const readonly = writable(false);
export const nonenumerable = enumerable(false);
export const nonconfigurable = configurable(false);

// Uppercase aliases
export { configurable as Configurable };
export { enumerable as Enumerable };
export { returnsArg as ReturnsArg };
export { writable as Writable };
export { deprecated as Deprecated };
export { readonly as Readonly };
export { nonenumerable as Nonenumerable };
export { nonconfigurable as Nonconfigurable };
