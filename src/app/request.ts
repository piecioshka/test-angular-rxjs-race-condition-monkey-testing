import * as Rx from 'rxjs/Rx';

export class Request {
  private trigger = new Rx.Subject<any>();
  public stream: Rx.Observable<any[]>;

  constructor(method) {
    this.stream = this.trigger
      .asObservable()
      .switchMap(method)
      .map((res: Rx.AjaxResponse) => res.response);
  }

  start(...args) {
    this.trigger.next(args[0]);
  }
}
