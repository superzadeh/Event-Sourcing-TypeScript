import * as bodyParser from 'body-parser';
import * as express from 'express';
import { injectable, multiInject } from 'inversify';
import * as logger from 'morgan';
import { ICommand } from '../Commands/ICommand';
import { appContainer } from '../container';
import { MemoryCache } from '../Infrastructure/Cache';
import TYPES from '../types';
import { IApi } from './IApi';

// Creates and configures an ExpressJS web server.
@injectable()
export class ApiBase implements IApi {

  public static bootstrap(): ApiBase {
    return appContainer.resolve(ApiBase);
  }

  // ref to Express instance
  public app: express.Application;
  // ref to Express router
  protected router: express.Router;

  // Run configuration methods on the Express instance.
  constructor(
  ) {
    this.app = express();
    this.router = express.Router();
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
    this.router.get('/healthcheck', (req, res, next) => {
      res.json({
        message: 'Healthy !',
      });
    });
    this.app.use('/api', this.router);
  }
}

export default ApiBase;
