import { Page } from '@playwright/test';
import { HomePage } from './home.page';
import { SearchResultsPage } from './search-results.page';

export class PageManager {
  private readonly homePage: HomePage;
  private readonly searchResultsPage: SearchResultsPage;

  constructor(page: Page) {
    this.homePage = new HomePage(page);
    this.searchResultsPage = new SearchResultsPage(page);
  }

  onHomePage(): HomePage {
    return this.homePage;
  }

  onSearchResultsPage(): SearchResultsPage {
    return this.searchResultsPage;
  }
}