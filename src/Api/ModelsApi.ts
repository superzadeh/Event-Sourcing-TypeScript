import * as bodyParser from 'body-parser';
import * as express from 'express';
import { injectable, multiInject } from 'inversify';
import * as logger from 'morgan';
import { appContainer } from '../container';
import { MemoryCache } from '../Infrastructure/Cache';
import { IReadModel } from '../ReadModels/IReadModel';
import TYPES from '../types';
import { ApiBase } from './ApiBase';
import { IApi } from './IApi';

// Creates and configures an ExpressJS web server.
@injectable()
export class ModelsApi extends ApiBase {

  public static bootstrap(): ModelsApi {
    return appContainer.resolve(ModelsApi);
  }

  // Configure API endpoints.
  public routes(): void {
    // Add custom routes
    const readModels: any[] = appContainer.getAll<IReadModel>(TYPES.IReadModel);
    readModels.forEach((element) => {
      this.router.get(`/${element.constructor.name}/:id`, (req, res, next) => {
        const cache = new MemoryCache<typeof element>();
        cache.Store('12', { message: 'HelloWorld!' });
        res.json(
          cache.Get(req.params.id),
        );
      });
    });
    // bootstrap the base routes
    super.routes();
  }
}

export default ModelsApi;
