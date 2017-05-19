import { Applicator } from '../applicators';
import { CompositeKeyWeakMap } from '../utils';

export type ApplicatorToken = { new(): Applicator };
export type LodashMethodDecorator = MethodDecorator;
export type LodashDecorator = MethodDecorator & PropertyDecorator;
export type ResolvableFunction = string|Function;

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
