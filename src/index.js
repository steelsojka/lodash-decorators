import functions from 'lodash/function';

import bind from './bind/bind';
import tap from './tap';
import bindAll from './bind/bindAll';
import mixin from './mixin';
import attempt from './attempt';

import { createDecorator, createInstanceDecorator } from './decoratorFactory';
import { applicators } from './Applicator';

export { bind };
export { tap };
export { bindAll };
export { mixin };
export { attempt };

// Instance decorators
export const once = createInstanceDecorator(functions.once, applicators.single);
export const debounce = createInstanceDecorator(functions.debounce, applicators.pre);
export const throttle = createInstanceDecorator(functions.throttle, applicators.pre);
export const memoize = createInstanceDecorator(functions.memoize, applicators.pre);
export const after = createInstanceDecorator(functions.after, applicators.post);
export const before = createInstanceDecorator(functions.before, applicators.post);

// Prototype decorators
export const spread = createDecorator(functions.spread, applicators.single);
export const rearg = createDecorator(functions.rearg, applicators.single);
export const negate = createDecorator(functions.negate, applicators.single);
export const modArgs = createDecorator(functions.modArgs, applicators.pre);
export const ary = createDecorator(functions.ary, applicators.pre);
export const curry = createDecorator(functions.curry, applicators.pre);
export const curryRight = createDecorator(functions.curryRight, applicators.pre);
export const restParam = createDecorator(functions.restParam, applicators.pre);
export const partial = createDecorator(functions.partial, applicators.partial);
export const partialRight = createDecorator(functions.partialRight, applicators.partial);
export const wrap = createDecorator(functions.wrap, applicators.wrap);
export const compose = createDecorator(functions.compose, applicators.compose);
export const flow = createDecorator(functions.flow, applicators.compose);
export const flowRight = createDecorator(functions.flowRight, applicators.compose);
export const backflow = createDecorator(functions.backflow, applicators.compose);
export const delay = createDecorator(functions.delay, applicators.partialed);
export const defer = createDecorator(functions.defer, applicators.partialed);

// Uppercase aliases
export { once as Once };
export { debounce as Debounce };
export { throttle as Throttle };
export { memoize as Memoize };
export { after as After };
export { before as Before };
export { spread as Spread };
export { rearg as Rearg };
export { negate as Negate };
export { modArgs as ModArgs };
export { ary as Ary };
export { curry as Curry };
export { curryRight as CurryRight };
export { restParam as RestParam };
export { partial as Partial };
export { partialRight as PartialRight };
export { wrap as Wrap };
export { compose as Compose };
export { flow as Flow };
export { flowRight as FlowRight };
export { backflow as Backflow };
export { delay as Delay };
export { defer as Defer };
export { bind as Bind };
export { tap as Tap };
export { bindAll as BindAll };
export { mixin as Mixin };
export { attempt as Attempt };
