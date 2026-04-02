import { Locator, Page, Response } from '@playwright/test';
import { getBaseUrl } from '../config/env';

export class SearchResultsPage {
  readonly page: Page;
  readonly resultsHeading: Locator;
  readonly resultTitleLinks: Locator;
  readonly noResultsSection: Locator;
  readonly noResultsMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.resultsHeading = page.getByRole('heading', {
      name: /resultados encontrados para:/i
    });

    this.noResultsSection = page.locator('section.no-results');
    this.noResultsMessage = page.locator('section.no-results p');

    this.resultTitleLinks = page.locator('article.post h2.entry-title a');
  }

  async openWithSearchTerm(term: string): Promise<Response | null> {
    return await this.page.goto(
      `${getBaseUrl('blog')}/?s=${encodeURIComponent(term)}`
    );
  }

  async waitForResultsPage(): Promise<void> {
    await this.resultsHeading.waitFor({ state: 'visible' });
  }

  getResultsHeading(): Locator {
    return this.resultsHeading;
  }

  getNoResultsSection(): Locator {
  return this.noResultsSection;
  }

  getNoResultsMessage(): Locator {
    return this.noResultsMessage;
  }

  async getNoResultsMessageText(): Promise<string> {
    return (await this.noResultsMessage.textContent())?.trim() ?? '';
}

  async getAllResultTitles(): Promise<string[]> {
    const titles = await this.resultTitleLinks.allTextContents();
    return titles.map(title => title.trim()).filter(Boolean);
  }
}