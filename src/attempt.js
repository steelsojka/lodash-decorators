import partial from 'lodash/function/partial';
import attempt from 'lodash/utility/attempt';
import { createDecorator } from './decoratorFactory';
import { applicators } from './Applicator';

export default createDecorator(fn => partial(attempt, fn), applicators.single);
