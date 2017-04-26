export interface ICommandHandler<T> {
  handle(command: T): boolean;
}
