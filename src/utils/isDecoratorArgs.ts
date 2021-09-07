import isObject from 'lodash/isObject';
import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';

export function isMethodOrPropertyDecoratorArgs(...args: any[]): boolean {
  return args.length >= 2
    && isObject(args[0])
    && isString(args[1])
    && isFunction(args[0].constructor)
    && args[0].constructor.prototype === args[0];
}
