import { Container } from 'inversify';
import 'reflect-metadata';
import { ExpressApi } from './Api/ExpressApi';
import { IApi } from './Api/IApi';
import { Account } from './ReadModels/Account';
import { IReadModel } from './ReadModels/IReadModel';
import TYPES from './types';

const appContainer = new Container();
appContainer.bind<IReadModel>(TYPES.IReadModel).to(Account);

export { appContainer };
