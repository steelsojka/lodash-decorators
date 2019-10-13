import { Throttle, ThrottleGetter, ThrottleSetter } from './throttle';
import spec from '../specs/throttle';

spec('legacy', Throttle, ThrottleGetter, ThrottleSetter);
