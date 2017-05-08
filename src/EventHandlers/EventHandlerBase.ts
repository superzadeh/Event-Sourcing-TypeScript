import * as redis from 'redis';
import { CounterEvent } from '../Events/CounterEvents';
import { ICache } from '../Infrastructure/Cache';
import { Counter } from '../ReadModels/Counter';
import { IEventHandler } from './IEventHandler';

export abstract class EventHandlerBase<T> implements IEventHandler<T> {

  protected sub: redis.RedisClient;

  public start(): void {
    this.sub = redis.createClient({ host: 'redis' });
    this.sub.subscribe('commands');
    this.sub.on('message', (channel: string, message: any) => {
      this.handle(JSON.parse(message));
    });
  }

  public stop(): void {
    this.sub.unsubscribe();
    this.sub.quit();
  }

  public abstract handle(event: T): void;
}
