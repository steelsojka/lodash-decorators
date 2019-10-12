import { DecoratorFactory, LodashMethodDecorator } from './factory';
import { ThrottleOptions } from './shared';
import config from './configs/throttleAll';

const decorator = DecoratorFactory.tc39.createDecorator(config);
export function ThrottleAll(
  wait?: number,
  options?: ThrottleOptions
): LodashMethodDecorator {
  return decorator(wait, options);
}
export { ThrottleAll as throttleAll };
export default decorator;
