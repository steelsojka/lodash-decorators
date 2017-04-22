import { Applicator } from '../applicators';

export class InternalApplicatorFactory {
  private _cache: Map<{ new(): Applicator }, Applicator> = new Map();

  get<T extends Applicator>(token: { new(): T }): T {
    if (!this._cache.has(token)) {
      this._cache.set(token, new token());
    }

    return this._cache.get(token) as T;
  }
}

export const ApplicatorFactory = new InternalApplicatorFactory();