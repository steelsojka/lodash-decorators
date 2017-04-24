import { copyMetadata } from './copyMetaData';

export function bind(fn: Function, context: any): Function {
  return copyMetadata(fn.bind(context), fn);
}