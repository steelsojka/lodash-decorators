import { Applicator } from '../applicators';
import { CompositeKeyWeakMap } from '../utils';

export type ApplicatorToken = { new(): Applicator };

export const InstanceMethodMap = new CompositeKeyWeakMap<Function[]>();