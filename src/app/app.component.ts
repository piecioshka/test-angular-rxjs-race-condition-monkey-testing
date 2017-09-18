import { Component, ViewChild, OnInit } from '@angular/core';
import { Article } from './article.interface';
import { ArticlesService } from './articles.service';

import * as Rx from 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  articles: Array<Article>;

  @ViewChild('button') $button;

  constructor(private articlesService: ArticlesService) {
    this.articles = [];
  }

  ngOnInit() {
    Rx.Observable
      .fromEvent(this.$button.nativeElement, 'click')
      .do(() => {
        this.articles = [];
      })
      .switchMap(() => {
        return this.articlesService.fetchList();
      })
      .subscribe((list: Array<Article>) => {
        this.articles = list;
      });
  }
}
