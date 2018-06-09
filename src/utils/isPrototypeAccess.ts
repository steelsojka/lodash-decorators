export function isPrototypeAccess(context: object, target: object): boolean {
  return context === target
    || (context.constructor !== target.constructor
      && Object.getPrototypeOf(this).constructor === target.constructor);
}
