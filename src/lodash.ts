import {
  once,
  debounce,
  throttle,
  memoize,
  after,
  before,
  spread,
  rearg,
  negate,
  overArgs,
  ary,
  curry,
  curryRight,
  rest,
  partial,
  partialRight,
  wrap,
  flow,
  flowRight,
  delay,
  defer,
  unary,
  flip
} from 'lodash';

import {
  DecoratorConfig,
  DecoratorFactory
} from './factory';
import {
  PreValueApplicator,
  PostValueApplicator,
  WrapApplicator,
  ComposeApplicator,
  PartialApplicator,
  PartialedApplicator
} from './applicators';

export const OnceDecoratorConfig = new DecoratorConfig(once, PreValueApplicator);
export const DebounceDecoratorConfig = new DecoratorConfig(debounce, PreValueApplicator);
export const ThrottleDecoratorConfig = new DecoratorConfig(throttle, PreValueApplicator);
export const MemoizeDecoratorConfig = new DecoratorConfig(memoize, PreValueApplicator);
export const AfterDecoratorConfig = new DecoratorConfig(after, PostValueApplicator);
export const BeforeDecoratorConfig = new DecoratorConfig(before, PostValueApplicator);
export const SpreadDecoratorConfig = new DecoratorConfig(spread, PreValueApplicator);
export const ReargDecoratorConfig = new DecoratorConfig(rearg, PreValueApplicator);
export const NegateDecoratorConfig = new DecoratorConfig(negate, PreValueApplicator);
export const OverArgsDecoratorConfig = new DecoratorConfig(overArgs, PreValueApplicator);
export const AryDecoratorConfig = new DecoratorConfig(ary, PreValueApplicator);
export const UnaryDecoratorConfig = new DecoratorConfig(unary, PreValueApplicator);
export const CurryDecoratorConfig = new DecoratorConfig(curry, PreValueApplicator);
export const CurryRightDecoratorConfig = new DecoratorConfig(curryRight, PreValueApplicator);
export const RestDecoratorConfig = new DecoratorConfig(rest, PreValueApplicator);
export const PartialDecoratorConfig = new DecoratorConfig(partial, PartialApplicator);
export const PartialRightDecoratorConfig = new DecoratorConfig(partialRight, PartialApplicator);
export const WrapDecoratorConfig = new DecoratorConfig(wrap, WrapApplicator);
export const FlowDecoratorConfig = new DecoratorConfig(flow, ComposeApplicator);
export const FlowRightDecoratorConfig = new DecoratorConfig(flowRight, ComposeApplicator);
export const DelayDecoratorConfig = new DecoratorConfig(delay, PartialedApplicator);
export const DeferDecoratorConfig = new DecoratorConfig(defer, PartialedApplicator);
export const FlipDecoratorConfig = new DecoratorConfig(flip, PreValueApplicator);

export const Once = DecoratorFactory.createInstanceDecorator(OnceDecoratorConfig)();
export const Debounce = DecoratorFactory.createInstanceDecorator(DebounceDecoratorConfig);
export const Throttle = DecoratorFactory.createInstanceDecorator(ThrottleDecoratorConfig);
export const Memoize = DecoratorFactory.createInstanceDecorator(MemoizeDecoratorConfig);
export const After = DecoratorFactory.createInstanceDecorator(AfterDecoratorConfig);
export const Before = DecoratorFactory.createInstanceDecorator(BeforeDecoratorConfig);
export const Spread = DecoratorFactory.createDecorator(SpreadDecoratorConfig);
export const Rearg = DecoratorFactory.createDecorator(ReargDecoratorConfig);
export const Negate = DecoratorFactory.createDecorator(NegateDecoratorConfig);
export const OverArgs = DecoratorFactory.createDecorator(OverArgsDecoratorConfig);
export const Ary = DecoratorFactory.createDecorator(AryDecoratorConfig);
export const Curry = DecoratorFactory.createDecorator(CurryDecoratorConfig);
export const CurryRight = DecoratorFactory.createDecorator(CurryRightDecoratorConfig);
export const Rest = DecoratorFactory.createDecorator(RestDecoratorConfig);
export const Partial = DecoratorFactory.createDecorator(PartialDecoratorConfig);
export const PartialRight = DecoratorFactory.createDecorator(PartialRightDecoratorConfig);
export const Wrap = DecoratorFactory.createDecorator(WrapDecoratorConfig);
export const Flow = DecoratorFactory.createDecorator(FlowDecoratorConfig);
export const FlowRight = DecoratorFactory.createDecorator(FlowRightDecoratorConfig);
export const Delay = DecoratorFactory.createDecorator(DelayDecoratorConfig);
export const Defer = DecoratorFactory.createDecorator(DeferDecoratorConfig);
export const Unary = DecoratorFactory.createDecorator(UnaryDecoratorConfig);
export const Flip = DecoratorFactory.createDecorator(FlipDecoratorConfig);