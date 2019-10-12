import { DecoratorFactory } from './factory';
import config from './configs/partialRight';

const decorator = DecoratorFactory.tc39.createInstanceDecorator(config);

export function PartialRight(...partials: any[]): PropertyDecorator {
  return decorator(...partials);
}
export { PartialRight as partialRight };
export default decorator;
