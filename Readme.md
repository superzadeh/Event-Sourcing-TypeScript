# Event sourcing in TypeScript

This repository is a work in progress.

## Goal

What I'm trying to build a low ceremony event sourcing system built using TypeScript
to benefit from the lightweight and flexibility of JavaScript while still having
the advantages of static typing.

## Installing

To get the most ouf of this project, it is recommended to use VSCode. A list of
recommended extensions is provided to help working with the best TypeScript tooling.

To install all dependencies, simply run:

```
npm install
```

## TypeScript

The Tagged unions of the TypeScript language are heavily used to provide first class
development experience when implementing command and event handlers, with autocompletion
and type checking on the consumed events/commands while still having a class with a
single `Handle` method.

No other wiring up is required, to handle additional events or command, all you need is
to create them, add them to a Tagged Union and process them in the
`handle` methods of corresponding EventHandlers/CommandHandlers.

## API Endpoints

API endpoints are automatically generated for ReadModels and Command Handlers.
This is achieved using [InversifyJS](https://github.com/inversify/InversifyJS) in
order to retrieve all ReadModels/CommandHandlers and create Express routes for each
of them.

The API endpoints are split into 2: one for command handlers, one for read models to
allow for better control of scalability.

### Running the ReadModels API

```sh
npm run start:models
curl http://localhost:8080/api/account/12
```

### Running the Commands API

```sh
npm run start:commands
curl --data "commandName=INCREMENT_COUNTER" http://localhost:8081/api/counter
```
