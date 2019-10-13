import { Bind } from './bind';
import { Memoize } from './memoize';
import { Curry } from './curry';
import { Delay } from './delay';
import spec from '../specs/combinationTest';

spec('legacy', Bind, Memoize, Curry, Delay);
