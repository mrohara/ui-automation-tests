import { Locator, Page } from '@playwright/test';
import { getBaseUrl } from '../config/env';

export class HomePage {
  readonly page: Page;
  readonly searchTrigger: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchTrigger = page.locator('a[aria-label="Search button"]');
  }

  async open(): Promise<void> {
    await this.page.goto(getBaseUrl('blog'));
  }

  async waitForPageToBeReady(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
    await this.searchTrigger.waitFor({ state: 'visible' });
  }

  getSearchTrigger(): Locator {
    return this.searchTrigger;
  }
}