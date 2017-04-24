import { ApplicateOptions } from '../shared';

export { ApplicateOptions } from '../shared';

export abstract class Applicator {
  abstract apply(options: ApplicateOptions): any;
}