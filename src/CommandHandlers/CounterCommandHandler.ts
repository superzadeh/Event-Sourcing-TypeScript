import { injectable } from 'inversify';
import * as redis from 'redis';
import { CounterCommand } from '../Commands/CounterCommand';
import { CounterDecremented, CounterEvent, CounterIncremented } from '../Events/CounterEvents';
import { CommandHandlerBase } from './CommandHandlerBase';
import { ICommandHandler } from './ICommandHandler';

@injectable()
export class CounterCommandHandler extends CommandHandlerBase<CounterCommand> {
  public handle(command: CounterCommand): boolean {
    let event: CounterEvent;

    switch (command.commandName) {
      /*
      * TODO: replace this by building a Counter aggregate
      * and calling Counter.Increment(), Counter.Decrement(), Counter.Reset()
      * This aggregate will also dispatch the events and should be built from
      * the EventStore
      */
      case 'INCREMENT_COUNTER':
        event = {
          timestamp: new Date(),
          type: 'COUNTER_INCREMENTED',
          id: command.counterId.toString(),
        };
        this.pub.publish('commands', JSON.stringify(event));
        break;

      case 'DECREMENT_COUNTER':
        event = {
          timestamp: new Date(),
          type: 'COUNTER_DECREMENTED',
          id: command.counterId.toString(),
        };
        this.pub.publish('commands', JSON.stringify(event));
        break;

      case 'RESET_COUNTER':
        event = {
          timestamp: new Date(),
          type: 'COUNTER_RESET',
          id: command.counterId.toString(),
        };
        this.pub.publish('commands', JSON.stringify(event));
        break;

      default:
        return false;
    }
  }
}
