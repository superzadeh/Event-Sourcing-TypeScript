
import { CommandBase } from './CommandBase';

export interface CounterCommandBase extends CommandBase {
  counterId: string;
}
export interface IncrementCounter extends CounterCommandBase {
  commandName: 'INCREMENT_COUNTER';
}
export interface DecrementCounter extends CounterCommandBase {
  commandName: 'DECREMENT_COUNTER';
}

export type CounterCommand = IncrementCounter | DecrementCounter;
