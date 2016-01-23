import partial from 'lodash/partial';
import attempt from 'lodash/attempt';
import { createDecorator } from './decoratorFactory';
import { applicators } from './Applicator';

export default createDecorator(fn => partial(attempt, fn), applicators.single);
