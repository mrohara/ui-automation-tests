import { test, expect } from '@playwright/test';
import { PageManager } from '../src/pages/page-manager';
import { testData } from '../src/config/env';

test.describe('Agi Blog - Search', () => {
  test('should display search component on home page @smoke', async ({ page }) => {
    const pages = new PageManager(page);
    const homePage = pages.onHomePage();

    await homePage.open();
    await homePage.waitForPageToBeReady();

    await expect(homePage.getSearchTrigger()).toBeVisible();
  });

  test('should return results when searching a valid term @search', async ({ page }) => {
    const pages = new PageManager(page);
    const searchPage = pages.onSearchResultsPage();

    const term = testData.blog.search.validTermNoAccent;

    const response = await searchPage.openWithSearchTerm(term);

    expect(response?.ok()).toBeTruthy();

    await searchPage.waitForResultsPage();

    await expect(searchPage.getResultsHeading()).toBeVisible();

    const titles = await searchPage.getAllResultTitles();

    expect(titles.length).toBeGreaterThan(0);
  });

  test('should display proper message when no results are found @search @negative', async ({ page }) => {
    const pages = new PageManager(page);
    const searchPage = pages.onSearchResultsPage();

    const term = testData.blog.search.invalidTerm;

    const response = await searchPage.openWithSearchTerm(term);

    expect(response?.ok()).toBeTruthy();

    await searchPage.waitForResultsPage();

    await expect(searchPage.getResultsHeading()).toBeVisible();

    const titles = await searchPage.getAllResultTitles();
    expect(titles.length).toBe(0);

    await expect(searchPage.getNoResultsSection()).toBeVisible();

    const message = await searchPage.getNoResultsMessageText();

    expect(message.toLowerCase()).toContain(testData.blog.search.invalidTermResultMessage.toLowerCase());
});
});