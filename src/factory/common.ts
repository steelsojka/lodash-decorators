import { Applicator } from '../applicators';
import { CompositeKeyWeakMap } from '../utils';

export type ApplicatorToken = { new(): Applicator };
export type LodashMethodDecorator = MethodDecorator;
export type LodashDecorator = MethodDecorator & PropertyDecorator;
export type ResolvableFunction = string|Function;

export type BiTypedMethodDecorator = (() => LodashMethodDecorator) & LodashMethodDecorator;
export type BiTypedMethodDecorator1<T> = ((arg?: T) => LodashMethodDecorator) & LodashMethodDecorator;
export type BiTypedMethodDecorator2<T, T2> = ((arg1?: T, arg2?: T2) => LodashMethodDecorator) & LodashMethodDecorator;
export type BiTypedMethodDecorator3<T, T2, T3> = ((arg1?: T, arg2?: T2, arg3?: T3) => LodashMethodDecorator) & LodashMethodDecorator;
export type BiTypedMethodDecoratorN = ((...args: any[]) => LodashMethodDecorator) & LodashMethodDecorator;
export type BiTypedDecorator = (() => LodashDecorator) & LodashDecorator;
export type BiTypedDecorator1<T> = ((arg?: T) => LodashDecorator) & LodashDecorator;
export type BiTypedDecorator2<T, T2> = ((arg1?: T, arg2?: T2) => LodashDecorator) & LodashDecorator;
export type BiTypedDecorator3<T, T2, T3> = ((arg1?: T, arg2?: T2, arg3?: T3) => LodashDecorator) & LodashDecorator;
export type BiTypedDecoratorN = ((...args: any[]) => LodashDecorator) & LodashDecorator;

export interface InstanceChainContext {
  getter?: boolean;
  setter?: boolean;
  method?: boolean;
  property?: boolean;
  value: any;
}

export interface InstanceChainData {
  properties: string[];
  fns: Function[];
  isGetter: boolean;
  isSetter: boolean;
  isMethod: boolean;
  isProperty: boolean;
}

export const InstanceChainMap = new CompositeKeyWeakMap<InstanceChainData>();
