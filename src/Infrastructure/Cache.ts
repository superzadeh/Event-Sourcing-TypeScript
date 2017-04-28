import * as redis from 'redis';
import { IVersionable } from '../ReadModels/IVersionable';

export interface ICache<T extends IVersionable> {
  Get(key: string, callback: (result: T) => void): void;
  Remove(key: string): boolean;
  Store(key: string, value: T): void;
}

export class MemoryCache<T extends IVersionable> implements ICache<T> {
  private values: { [key: string]: T; } = {};
  public Get(key: string, callback: (result: T) => void) {
    callback(this.values[key]);
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

export class RedisCache<T extends IVersionable> implements ICache<T> {
  private redis: redis.RedisClient;
  private values: { [key: string]: T; } = {};
  constructor() {
    this.redis = redis.createClient({ host: 'redis' });
  }
  public Get(key: string, callback: (result: T) => void) {
    this.redis.get(key, (err, value) => {
      const obj: T = JSON.parse(value);
      callback(obj);
    });
  }
  public Store(key: string, value: T) {
    value.lastUpdated = new Date();
    if (!value.version) { value.version = 0; }
    value.version += 1;
    this.redis.set(key, JSON.stringify(value));
  }
  public Remove(key: string): boolean {
    return this.redis.del(key);
  }
}
