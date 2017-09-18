import { Injectable } from '@angular/core';
import { AjaxResponse } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/dom/ajax';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

const randomInteger = () => Math.floor(Math.random() * 10);
import { EventEmitter } from './event-emitter';

@Injectable()
export class ArticlesService {

  emitter = new EventEmitter();
  stream = Observable.create((observer) => {
    this.emitter.on('fetch-from-server', () => {
      observer.next();
    });
  }).switchMap(this.fetchServerList);

  constructor() { }

  fetchMockList() {
    return Observable
      .of([
        { title: 'title-' + randomInteger() },
        { title: 'title-' + randomInteger() },
        { title: 'title-' + randomInteger() },
        { title: 'title-' + randomInteger() },
        { title: 'title-' + randomInteger() },
      ])
      .delay(1000);
  }

  fetchServerList() {
    return Observable
      .ajax(
        'https://jsonplaceholder.typicode.com/posts?userId=' + randomInteger()
      )
      .delay(1000)
      .map((response: AjaxResponse) => response.response);
  }

  fetchList() {
    // return this.fetchMockList();
    this.emitter.emit('fetch-from-server');
    return this.stream;
  }
}
