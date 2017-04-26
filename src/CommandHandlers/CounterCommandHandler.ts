import { injectable } from 'inversify';
import { CounterCommand } from '../Commands/CounterCommand';
import { ICommandHandler } from './ICommandHandler';

@injectable()
export class CounterCommandHandler implements ICommandHandler<CounterCommand> {
  public handle(command: CounterCommand): boolean {
    console.log(`Handling command ${command.commandName}`);
    switch (command.commandName) {
      case 'INCREMENT_COUNTER':
        break;
      case 'DECREMENT_COUNTER':
        break;
      default:
        return false;
    }
  }
}
