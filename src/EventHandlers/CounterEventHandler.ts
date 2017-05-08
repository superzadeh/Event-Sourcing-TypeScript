import { inject, injectable } from 'inversify';
import * as redis from 'redis';
import { CounterEvent } from '../Events/CounterEvents';
import { ICache } from '../Infrastructure/Cache';
import { Counter } from '../ReadModels/Counter';
import TYPES from '../types';
import { EventHandlerBase } from './EventHandlerBase';
import { IEventHandler } from './IEventHandler';

@injectable()
export class CounterEventHandler extends EventHandlerBase<CounterEvent> {

  private cache: ICache<Counter>;

  constructor(
    @inject(TYPES.ICache) cache: ICache<Counter>,
  ) {
    super();
    this.cache = cache;
  }

  public handle(event: CounterEvent) {
    const process = (model: Counter) => {
      console.log('Processing event', event);

      if (!model) {
        model = new Counter();
        model.id = event.id;
      }

      switch (event.type) {
        case 'COUNTER_INCREMENTED':
          model.value += 1;
          model.numberOfTimesIncremented += 1;
          this.cache.Store(model.id, model);
          break;
        case 'COUNTER_DECREMENTED':
          model.value -= 1;
          model.numberOfTimesDecremented += 1;
          this.cache.Store(model.id, model);
          break;
        case 'COUNTER_RESET':
          model.value = 0;
          model.numberOfTimesDecremented += 1;
          this.cache.Store(model.id, model);
          break;
      }
    };
    this.cache.Get(event.id, process);
  }

}
