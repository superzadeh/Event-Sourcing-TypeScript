export interface ICache<T> {
  Get(key: string): T;
  Remove(key: string): boolean;
  Store(key: string, value: T): void;
}

export class MemoryCache<T> implements ICache<T> {
  private _values: { [key: string]: T; } = {};
  Get(key: string) {
    return this._values[key];
  }
  Store(key: string, value: T) {
    this._values[key] = value;
  }
  Remove(key: string): boolean {
    return this._values[key] = null;
  }
}