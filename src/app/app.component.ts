import { Component } from '@angular/core';
import { Article } from './article.interface';
import { ArticlesService } from './articles.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  articles: Array<Article>;

  private stream = this.articlesService.fetchList();

  constructor(private articlesService: ArticlesService) {
    this.articles = [];
  }

  onClickHandler() {
    this.articles = [];

    this.stream
      .subscribe((list: Array<Article>) => {
        this.articles = list;
      });
  }
}
