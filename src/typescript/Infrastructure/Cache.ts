export interface ICache<T> {
  Get(key: string): T;
  Remove(key: string): boolean;
  Store(key: string, value: T): void;
}

export class MemoryCache<T> implements ICache<T> {
  private values: { [key: string]: T; } = {};
  public Get(key: string) {
    return this.values[key];
  }
  public Store(key: string, value: T) {
    this.values[key] = value;
  }
  public Remove(key: string): boolean {
    return this.values[key] = null;
  }
}
