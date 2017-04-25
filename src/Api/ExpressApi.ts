import * as bodyParser from 'body-parser';
import * as express from 'express';
import { injectable, multiInject } from 'inversify';
import * as logger from 'morgan';
import { appContainer } from '../container';
import { IReadModel } from '../ReadModels/IReadModel';
import TYPES from '../types';
import { IApi } from './IApi';

// Creates and configures an ExpressJS web server.
@injectable()
export class ExpressApi implements IApi {

  public static bootstrap(): ExpressApi {
    return appContainer.resolve(ExpressApi);
  }

  // ref to Express instance
  public app: express.Application;
  private readModels: any[];

  // Run configuration methods on the Express instance.
  constructor(
  ) {
    this.readModels = appContainer.getAll<IReadModel>(TYPES.IReadModel);
    this.app = express();
    this.middleware();
    this.routes();
  }

  // Configure Express middleware.
  public middleware(): void {
    this.app.use(logger('dev'));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  // Configure API endpoints.
  public routes(): void {
    /* This is just to get up and running, and to make sure what we've got is
     * working so far. This function will change when we start to add more
     * API endpoints */
    const router = express.Router();

    this.readModels.forEach((element) => {
      // placeholder route handler
      router.get(`/${element.constructor.name}`, (req, res, next) => {
        res.json({
          message: `Hello World from ${element.constructor.name}!`,
        });
      });
    });
    router.get(`/`, (req, res, next) => {
      res.json({
        message: `Hello World!`,
      });
    });
    this.app.use('/', router);
  }
}

export default ExpressApi;
