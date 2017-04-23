import { ApplicatorToken } from './common';

export class DecoratorConfig {
  constructor(
    public readonly execute: Function,
    public readonly applicator: ApplicatorToken
  ) {}
}