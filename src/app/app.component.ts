import { Component } from '@angular/core';
import { Article } from './article.interface';
import { ArticlesService } from './articles.service';

import { Request } from './request';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  articles: Array<Article>;

  private request: Request;

  constructor(private articlesService: ArticlesService) {
    this.articles = [];
    this.request = new Request(() => this.articlesService.fetchList());
  }

  ngOnInit() {
    this.request.stream
      .subscribe((list: Array<Article>) => {
        this.articles = list;
      });
  }

  onClickHandler() {
    this.articles = [];
    this.request.start();
  }
}
