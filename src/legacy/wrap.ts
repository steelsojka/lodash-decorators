import {
  DecoratorFactory,
  ResolvableFunction,
  LodashMethodDecorator
} from './factory';
import config from '../configs/wrap';

const decorator = DecoratorFactory.legacy.createDecorator(config);

export function Wrap(fnToWrap?: ResolvableFunction): LodashMethodDecorator {
  return decorator(fnToWrap);
}
export { Wrap as wrap };
export default decorator;
