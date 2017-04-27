import axios from 'axios';
import 'reflect-metadata';
import {
  DecrementCounter,
  IncrementCounter,
} from './Commands/CounterCommand';
import { CounterEventHandler } from './EventHandlers/CounterEventHandler';
import { RedisCache } from './Infrastructure/Cache';

console.log('Starting...');

// Init
const increment: IncrementCounter = { commandName: 'INCREMENT_COUNTER', counterId: 2 };
const decrement: DecrementCounter = { commandName: 'DECREMENT_COUNTER', counterId: 2 };

// Start Event Handlers
const eventHandler = new CounterEventHandler(new RedisCache());

// Util functions
const sendCounterCommand = (command: IncrementCounter | DecrementCounter) => {
  return axios.post('http://localhost:8081/api/counter', command)
    .then((response) => {
      // console.log('Send command response: ', response.data);
    }).catch((error) => {
      console.log(error);
    });
};

const getCounter = () => {
  return axios.get('http://localhost:8080/api/counter/1')
    .then((response) => {
      console.log('Get counter: ', response.data);
    }).catch((error) => {
      console.log(error);
    });
};

// Play demo
sendCounterCommand(increment)
  .then(() => getCounter())
  .then(() => sendCounterCommand(decrement))
  .then(() => getCounter())
  .then(() => sendCounterCommand(increment))
  .then(() => sendCounterCommand(increment))
  .then(() => sendCounterCommand(increment))
  .then(() => sendCounterCommand(increment))
  .then(() => getCounter());
