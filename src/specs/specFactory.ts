export function specFactory<T extends (...args: any) => any>(title: string, factory: (decorator: T) => void): (type: string, decorator: T) => void {
  return function(type: string, decorator: T): void {
    describe(`${title} - ${type}`, () => {
      factory(decorator);
    });
  };
}
