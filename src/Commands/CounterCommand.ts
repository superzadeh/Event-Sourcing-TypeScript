
import { ICommand } from './ICommand';

export interface CounterCommandBase extends ICommand {
  counterId: number;
}
export interface IncrementCounter extends CounterCommandBase {
  commandName: 'INCREMENT_COUNTER';
}
export interface DecrementCounter extends CounterCommandBase {
  commandName: 'DECREMENT_COUNTER';
}

export type CounterCommand = IncrementCounter | DecrementCounter;
