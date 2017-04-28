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

## Building and Running

Everything is automated. All components run into docker containers and have watch mode enabled
for development. Change a file in TypeScript, it will be built automatically and the process
running in docker will be restarted (achieved using a build with watch mode, pm2 with watch mode
as well and mounting volumes in `docker-compose.override.yml`).

```sh
// build and lint the TypeScript code once
npm run build
// build and rebuild on file changes.
// Since we are using pm2 in watch mode, the app will also restart automatically with updates
npm run build:watch
// Then build and run the containers
docker-compose build
// pm2 inside docker will watch for changes and restart processes as needed
docker-compose up
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
of them. The registration is done in ``container.ts`.

The API endpoints are split into 2: one for command handlers, one for read models to
allow for better control of scalability.

### Running the ReadModels API

```sh
npm run start:models
curl http://localhost:8080/api/counter/12
```

### Running the Commands API

```sh
npm run start:commands
curl --data "commandName=INCREMENT_COUNTER&counterId=1" http://localhost:8081/api/counter
```
