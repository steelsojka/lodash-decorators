export default function enumerableWrapper(enumerable = true) {
  return function enumerableDecorator(target, name, descriptor) {
    descriptor.enumerable = enumerable;
    return descriptor;
  };
}
