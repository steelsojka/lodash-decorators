import { Applicator } from '../applicators';
import { CompositeKeyWeakMap } from '../utils';

export type ApplicatorToken = { new(): Applicator };
export type LodashDecorator = MethodDecorator & PropertyDecorator;
export type ResolvableFunction = string|Function;

export const InstanceMethodMap = new CompositeKeyWeakMap<Function[]>();