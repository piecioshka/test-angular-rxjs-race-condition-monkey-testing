import * as Rx from 'rxjs/Rx';

export class Request {
  private trigger = new Rx.Subject<any>();
  public stream: Rx.Observable<any[]>;
  public sub: Rx.Subscription;

  constructor(method) {
    this.stream = this.trigger
      .asObservable()
      .switchMap(method)
      .map((res: Rx.AjaxResponse) => res.response)
      .share();
  }

  subscribe(...args) {
    if (this.sub) {
      this.sub.unsubscribe();
    }

    this.sub = this.stream.subscribe.call(this.stream, ...args);
    this.trigger.next();
    // return this.sub;
  }
}

// https://stackoverflow.com/questions/34442693/how-to-cancel-a-subscription-in-angular2
