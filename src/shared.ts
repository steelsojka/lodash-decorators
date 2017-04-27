import { DecoratorConfig, ResolvableFunction } from './factory';

export interface DebounceOptions {
  wait?: number;
  leading?: boolean;
  trailing?: boolean;
  maxWait?: number;
}

export interface ApplicateOptions {
  config: DecoratorConfig;
  target: any;
  value: any;
  args: any[];
  instance?: Object;
}

export interface ThrottleOptions {
  leading?: boolean;
  trailing?: boolean;
}

export interface MemoizeMap<T, U> {
  get(key: T): U;
  has(key: T): boolean;
  set(key: T, value: U): void;
  delete(key: T): void;
  clear?(): void;
}

export interface MemoizeConfig<T, U> {
  resolver?: ResolvableFunction;
  type?: { new (...args: any[]): MemoizeMap<T, U> };
  cache?: MemoizeMap<T, U>;
}