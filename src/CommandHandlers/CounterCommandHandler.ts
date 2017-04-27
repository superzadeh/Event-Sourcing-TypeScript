import { injectable } from 'inversify';
import * as redis from 'redis';
import { CounterCommand } from '../Commands/CounterCommand';
import { CounterDecremented, CounterEvent, CounterIncremented } from '../Events/CounterEvents';
import { ICommandHandler } from './ICommandHandler';

@injectable()
export class CounterCommandHandler implements ICommandHandler<CounterCommand> {
  private pub: redis.RedisClient;
  constructor() {
    this.pub = redis.createClient();
  }
  public handle(command: CounterCommand): boolean {
    console.log(`Handling command ${command.commandName}`);
    let event: CounterEvent;
    switch (command.commandName) {
      case 'INCREMENT_COUNTER':
        event = {
          timestamp: new Date(),
          type: 'COUNTER_INCREMENTED',
          id: command.counterId.toString(),
        };
        console.log(`publish event ${JSON.stringify(event)}`);
        this.pub.publish('commands', JSON.stringify(event));
        break;
      case 'DECREMENT_COUNTER':
        event = {
          timestamp: new Date(),
          type: 'COUNTER_DECREMENTED',
          id: command.counterId.toString(),
        };
        console.log(`publish event ${JSON.stringify(event)}`);
        this.pub.publish('commands', JSON.stringify(event));
        break;
      default:
        return false;
    }
  }
}