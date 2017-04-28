import { injectable } from 'inversify';
import * as redis from 'redis';
import { CounterCommand } from '../Commands/CounterCommand';
import { CounterDecremented, CounterEvent, CounterIncremented } from '../Events/CounterEvents';
import { ICommandHandler } from './ICommandHandler';

@injectable()
export abstract class CommandHandlerBase<T> implements ICommandHandler<T> {
  protected pub: redis.RedisClient;
  constructor() {
    this.pub = redis.createClient({ host: 'redis' });
  }
  public abstract handle(command: T): boolean;
}
