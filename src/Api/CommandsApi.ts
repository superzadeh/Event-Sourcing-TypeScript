import * as bodyParser from 'body-parser';
import * as express from 'express';
import { injectable } from 'inversify';
import * as logger from 'morgan';
import { ICommandHandler } from '../CommandHandlers/ICommandHandler';
import { CounterCommand } from '../Commands/CounterCommand';
import { appContainer } from '../container';
import { MemoryCache } from '../Infrastructure/Cache';
import TYPES from '../types';
import { ApiBase } from './ApiBase';
import { IApi } from './IApi';

// Creates and configures an ExpressJS web server.
@injectable()
export class CommandsApi extends ApiBase {

  public static bootstrap(): CommandsApi {
    return appContainer.resolve(CommandsApi);
  }

  // Configure API endpoints.
  public routes(): void {
    // Get all command handlers
    const commandHandlers: any[] = appContainer.getAll(TYPES.ICommand);
    // Add custom routes
    commandHandlers.forEach((commandHandler) => {
      const commandName = commandHandler.constructor.name.replace('CommandHandler', '');
      this.router.post(`/${commandName}`, (req, res, next) => {

        commandHandler.handle(req.body);

        res.json({
          message: `Command ${commandName} sent to ${commandHandler.constructor.name}`,
          parameters: req.body,
        });
      });
    });
    // bootstrap the base routes
    super.routes();
  }
}

export default CommandsApi;
