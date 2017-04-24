import { DecoratorConfig } from './factory';

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