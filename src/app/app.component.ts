import { Component, OnInit } from '@angular/core';
import { Article } from './article.interface';
import { ArticlesService } from './articles.service';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  articles: Array<Article>;

  private trigger = new Subject();

  private clickStream$ = this.trigger
    .asObservable()
    .switchMap(() => this.articlesService.fetchList());

  constructor(private articlesService: ArticlesService) {
    this.articles = [];
  }

  ngOnInit() {
    this.clickStream$
      .subscribe((list: Array<Article>) => {
        this.articles = list;
      });
  }

  onClickHandler() {
    this.articles = [];
    this.trigger.next();
  }
}
