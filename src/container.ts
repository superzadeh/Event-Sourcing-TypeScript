import { Container } from 'inversify';
import 'reflect-metadata';
import { IApi } from './Api/IApi';
import { CounterCommandHandler } from './CommandHandlers/CounterCommandHandler';
import { ICommandHandler } from './CommandHandlers/ICommandHandler';
import { CounterCommand } from './Commands/CounterCommand';
import { Counter } from './ReadModels/Counter';
import { IReadModel } from './ReadModels/IReadModel';
import TYPES from './types';

const appContainer = new Container();
// Register readmodels to expose them with the Models API
appContainer.bind<IReadModel>(TYPES.IReadModel).to(Counter);
// Register commands to expose them with the Commands API
appContainer.bind<ICommandHandler<CounterCommand>>(TYPES.ICommand).to(CounterCommandHandler);

export { appContainer };
