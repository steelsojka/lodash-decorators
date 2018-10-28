import { Applicator } from '../applicators';
import { CompositeKeyWeakMap } from '../utils';

export type ApplicatorToken = new () => Applicator;
export type LodashMethodDecorator = MethodDecorator;
export type LodashDecorator = MethodDecorator & PropertyDecorator;
export type Tc39LodashDecorator = Tc39MethodDecorator | Tc39FieldDecorator;
export type ResolvableFunction = string|Function;

export type LegacyBiTypedMethodDecorator = (() => LodashMethodDecorator) & LodashMethodDecorator;
export type LegacyBiTypedMethodDecorator1<T> = ((arg?: T) => LodashMethodDecorator) & LodashMethodDecorator;
export type LegacyBiTypedMethodDecorator2<T, T2> = ((arg1?: T, arg2?: T2) => LodashMethodDecorator) & LodashMethodDecorator;
export type LegacyBiTypedMethodDecorator3<T, T2, T3> = ((arg1?: T, arg2?: T2, arg3?: T3) => LodashMethodDecorator) & LodashMethodDecorator;
export type LegacyBiTypedMethodDecoratorN = ((...args: any[]) => LodashMethodDecorator) & LodashMethodDecorator;
export type LegacyBiTypedDecorator = (() => LodashDecorator) & LodashDecorator;
export type LegacyBiTypedDecorator1<T> = ((arg?: T) => LodashDecorator) & LodashDecorator;
export type LegacyBiTypedDecorator2<T, T2> = ((arg1?: T, arg2?: T2) => LodashDecorator) & LodashDecorator;
export type LegacyBiTypedDecorator3<T, T2, T3> = ((arg1?: T, arg2?: T2, arg3?: T3) => LodashDecorator) & LodashDecorator;
export type LegacyBiTypedDecoratorN = ((...args: any[]) => LodashDecorator) & LodashDecorator;

export type BiTypedMethodDecorator = (() => Tc39MethodDecorator) & Tc39MethodDecorator;
export type BiTypedMethodDecorator1<T> = ((arg?: T) => Tc39MethodDecorator) & Tc39MethodDecorator;
export type BiTypedMethodDecorator2<T, T2> = ((arg1?: T, arg2?: T2) => Tc39MethodDecorator) & Tc39MethodDecorator;
export type BiTypedMethodDecorator3<T, T2, T3> = ((arg1?: T, arg2?: T2, arg3?: T3) => Tc39MethodDecorator) & Tc39MethodDecorator;
export type BiTypedMethodDecoratorN = ((...args: any[]) => Tc39MethodDecorator) & Tc39MethodDecorator;
export type BiTypedDecorator = (() => Tc39LodashDecorator) & Tc39LodashDecorator;
export type BiTypedDecorator1<T> = ((arg?: T) => Tc39LodashDecorator) & Tc39LodashDecorator;
export type BiTypedDecorator2<T, T2> = ((arg1?: T, arg2?: T2) => Tc39LodashDecorator) & Tc39LodashDecorator;
export type BiTypedDecorator3<T, T2, T3> = ((arg1?: T, arg2?: T2, arg3?: T3) => Tc39LodashDecorator) & Tc39LodashDecorator;
export type BiTypedDecoratorN = ((...args: any[]) => Tc39LodashDecorator) & Tc39LodashDecorator;

export interface DecoratorMetadata {
  kind: 'field' | 'method' | 'class';
}

export interface Tc39FieldDecoratorMetadata<T = any> extends DecoratorMetadata {
  kind: 'field';
  key: keyof T;
  placement: 'own' | 'static' | 'prototype';
  descriptor: PropertyDescriptor;
  initializer: () => any;
}

export interface Tc39MethodDecoratorMetadata<T = any> extends DecoratorMetadata {
  kind: 'method';
  key: keyof T;
  placement: 'own' | 'static' | 'prototype';
  descriptor: PropertyDescriptor;
}

export interface Tc39ClassDecoratorMetadata extends DecoratorMetadata {
  kind: 'class';
  elements: Tc39ClassElement[];
}

export interface Tc39OptionalElements {
  extras?: Tc39ClassElement;
  finisher?: () => any;
}

export type Tc39ClassElement = (Tc39FieldDecoratorMetadata | Tc39MethodDecoratorMetadata) & Tc39OptionalElements;
export type Tc39FieldDecorator = (metadata: Tc39FieldDecoratorMetadata) => Tc39FieldDecoratorMetadata & Tc39OptionalElements;
export type Tc39MethodDecorator = (metadata: Tc39MethodDecoratorMetadata) => Tc39MethodDecoratorMetadata & Tc39OptionalElements;
export type Tc39ClassDecorator = (metadata: Tc39ClassDecoratorMetadata) => Tc39MethodDecoratorMetadata & { finisher?: () => any };

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
