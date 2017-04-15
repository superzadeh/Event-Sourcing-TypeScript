import { IVersionable } from '../ReadModels/IVersionable';

export interface ICache<T extends IVersionable> {
  Get(key: string): T;
  Remove(key: string): boolean;
  Store(key: string, value: T): void;
}

export class MemoryCache<T extends IVersionable> implements ICache<T> {
  private values: { [key: string]: T; } = {};
  public Get(key: string) {
    return this.values[key];
  }
  public Store(key: string, value: T) {
    value.lastUpdated = new Date();
    if (!value.version) { value.version = 0; }
    value.version += 1;
    this.values[key] = value;
  }
  public Remove(key: string): boolean {
    return this.values[key] = null;
  }
}
