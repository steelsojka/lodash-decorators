import { DecoratorFactory, BiTypedMethodDecorator1 } from './factory';
import config from './configs/rest';

export const Rest = DecoratorFactory.tc39.createDecorator(
  config
) as BiTypedMethodDecorator1<number>;
export { Rest as rest };
export default Rest;
