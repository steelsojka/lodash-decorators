import {
  DecoratorFactory,
  LodashDecorator,
  ResolvableFunction
} from './factory';
import config from '../configs/rearg';

const decorator = DecoratorFactory.legacy.createInstanceDecorator(config);

export function Rearg(
  indexes: ResolvableFunction | number | number[],
  ...args: Array<number | number[]>
): LodashDecorator {
  return decorator(indexes, ...args);
}
export { Rearg as rearg };
export default decorator;
