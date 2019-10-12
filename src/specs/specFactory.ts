type F = (...args: any[]) => any;

export function specFactory<A extends F, B extends F, C extends F, D extends F>(
  title: string,
  factory: (a: A, b: B, c: C, d: D) => void
): (type: string, a: F, b: F, c: F, d: F) => void;
export function specFactory<A extends F, B extends F, C extends F>(
  title: string,
  factory: (a: A, b: B, c: C) => void
): (type: string, a: F, b: F, c: F) => void;
export function specFactory<A extends F, B extends F>(
  title: string,
  factory: (a: A, b: B) => void
): (type: string, a: F, b: F) => void;
export function specFactory<A extends F>(
  title: string,
  factory: (a: A) => void
): (type: string, a: F) => void;
export function specFactory(
  title: string,
  factory: (...decorators: F[]) => void
): (type: string, ...decorators: F[]) => void {
  return function(type: string, ...decorators: any[]): void {
    describe(`${title} - ${type}`, () => {
      factory(...decorators);
    });
  };
}
