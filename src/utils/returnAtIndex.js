export default function returnAtIndex(fn, index) {
  return function(...args) {
    fn.call(this, ...args);
    return args[index];
  };
}
