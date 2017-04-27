import * as redis from 'redis';
import { CounterEvent } from '../Events/CounterEvents';
import { ICache } from '../Infrastructure/Cache';
import { Counter } from '../ReadModels/Counter';
import { IEventHandler } from './IEventHandler';

export class CounterEventHandler implements IEventHandler<CounterEvent> {
  private sub: redis.RedisClient;
  private cache: ICache<Counter>;

  constructor(cache: ICache<Counter>) {
    this.cache = cache;
    this.sub = redis.createClient();
    this.sub.on('message', (channel: string, message: any) => {
      this.handle(JSON.parse(message));
    });
    this.sub.subscribe('commands');
  }

  public handle(event: CounterEvent) {
    const process = (model: Counter) => {
      if (!model) {
        model = new Counter();
        model.id = event.id;
      }
      switch (event.type) {
        case 'COUNTER_INCREMENTED':
          model.value += 1;
          this.cache.Store(model.id, model);
          break;
        case 'COUNTER_DECREMENTED':
          model.value -= 1;
          this.cache.Store(model.id, model);
          break;
      }
    };
    this.cache.Get(event.id, process);
  }
}
