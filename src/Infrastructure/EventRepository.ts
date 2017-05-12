import { v4 } from 'uuid';

import axios, { AxiosInstance } from 'axios';
import * as _ from 'lodash';
import { EventBase } from '../Events/EventBase';

export class EventRepository {
  private httpClient: AxiosInstance;

  public constructor() {
    console.log(process.env.EVENTSTORE_ENDPOINT);
    this.httpClient = axios.create({
      baseURL: 'http://' + process.env.EVENTSTORE_ENDPOINT,
      timeout: 1000,
      headers: { 'Content-Type': 'application/vnd.eventstore.events+json' },
    });
  }

  public loadLast(id: any, callback: any) {
    const url = '/streams/' + id + '/head';

    this.httpClient.get(url)
      .then((response: any) => {
        console.log(response);
        const responseData = this.getEventResponseData(response);
        return callback && callback(responseData === null, responseData);
      })
      .catch((error) => console.log(error));
  }

  public load(id: any, callback: any) {
    const url =
      '/streams/' + id + '/head/backward/' + process.env.EVENTSTORE_BATCHSIZE + '?embed=body';
    this.loadUrl(url, null, callback);
  }

  public save(id: string, version: number, events: EventBase[], callback?: (val: boolean) => void) {

    if (events.length === 0) {
      console.log('warn', 'No events to save %s', id);
      return callback && callback(false);
    }
    console.log('debug', 'Save event %s', id);

    const eventsData = this.makePostEvent(events);

    this.httpClient.request({
      method: 'post',
      url: '/streams/' + id,
      data: eventsData,
    }).then((response: any) => {
      return callback && callback(response.status !== 201);
    }).catch((error) => console.log(error));
  }

  private parseVersion(headers: any) {
    const etag = headers.etag;
    return etag.substr(1, etag.length - 2).split(';')[0];
  }

  private parseEvents(body: any) {
    const eventsData: any[] = [];
    _.forEachRight(body.entries, (event: any) => {
      eventsData.push({
        name: event.eventType,
        body: JSON.parse(event.data),
      });
    });
    return eventsData;
  }

  private appendToResponse(response: any, responseData: any, body: any) {
    const events = this.parseEvents(body);
    _.forEachRight(events, (event: any) => {
      responseData.events.unshift(event);
    });
  }

  private parseEventsResponse(headers: any, body: any) {
    return {
      version: this.parseVersion(headers),
      events: this.parseEvents(body),
    };
  }

  private loadUrl(url: any, responseData: any, callback: any) {
    console.log('loadUrl: ' + url);
    this.httpClient.get(url)
      .then((response: any) => {
        if (response.status === 404) {
          return callback && callback(null, { version: '-1', events: [] });
        }

        if (response.status !== 200) {
          return callback && callback(true, 'invalid code: ' + response.status);
        }

        const data = JSON.parse(response.data);
        if (!responseData) {
          responseData = this.parseEventsResponse(response.headers, data);
        } else {
          this.appendToResponse(response, responseData, data);
        }

        const nextUrl = this.getNextUrl(data);
        if (nextUrl) {
          this.loadUrl(nextUrl, responseData, callback);
        } else {
          return callback && callback(null, responseData);
        }
      })
      .catch((error) => console.log(error));
  }

  private getNextUrl(body: any) {
    if (!body || !body.links) { return null; }
    const link = _.find(body.links, (l: any) => {
      return l.relation === 'next';
    });
    return link != null ? link.uri + '?embed=body' : null;
  }

  private parseEventResponse(headers: any, body: any) {
    console.log(body);
    return {
      version: this.parseVersion(headers),
      event: {
        name: body.content.eventType,
        body: body.content.data,
      },
    };
  }

  private getEventResponseData(response: any) {
    if (response.status === 200) {
      return this.parseEventResponse(response.headers, JSON.parse(response.data));
    }
    return null;
  }

  private makePostEvent(events: EventBase[]) {

    const eventsData = events.map((event: any) => {
      return {
        eventId: v4(),
        eventType: event.type,
        data: event,
      };
    });

    return eventsData;
  }
}
