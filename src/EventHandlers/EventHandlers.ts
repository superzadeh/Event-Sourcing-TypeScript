import { appContainer } from '../container';
import TYPES from '../types';
import { IEventHandler } from './IEventHandler';

class Handlers {
  private handlers: any[];
  constructor() {
    this.handlers = appContainer.getAll(TYPES.IEventHandler);
  }
  public start(): void {
    this.handlers.forEach((handler) => {
      handler.start();
    });
  }
}

const handlers = new Handlers();
handlers.start();

// Keep the process running until we kill it
process.stdin.resume();
process.on('SIGINT', () => {
  process.exit(0);
});
