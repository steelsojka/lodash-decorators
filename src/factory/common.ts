import { Applicator } from '../applicators';
import { CompositeKeyWeakMap } from '../utils';

export type ApplicatorToken = { new(): Applicator };
export type LodashMethodDecorator = MethodDecorator;
export type ResolvableFunction = string|Function;

export const InstanceChainMap = new CompositeKeyWeakMap<Function[]>();
export const ProtoInstanceMap = new CompositeKeyWeakMap<Function>();