import { Container } from 'inversify';
import 'reflect-metadata';
import { IApi } from './Api/IApi';
import { CounterCommandHandler } from './CommandHandlers/CounterCommandHandler';
import { ICommandHandler } from './CommandHandlers/ICommandHandler';
import { CounterCommand } from './Commands/CounterCommand';
import { Account } from './ReadModels/Account';
import { IReadModel } from './ReadModels/IReadModel';
import TYPES from './types';

const appContainer = new Container();
appContainer.bind<IReadModel>(TYPES.IReadModel).to(Account);
appContainer.bind<ICommandHandler<CounterCommand>>(TYPES.ICommand).to(CounterCommandHandler);

export { appContainer };
