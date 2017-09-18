export class EventEmitter {
  observers: Array<any>;

  constructor() {
    this.observers = [];
  }

  emit(name: string, ...args) {
    this.observers.forEach(observer => {
      if (observer.name === 'all') {
        observer.cb(name, ...args);
      }

      if (observer.name === name) {
        observer.cb(...args);
      }
    });
  }

  on(name: string, cb: Function) {
    this.observers.push({ name, cb });
  }
}
