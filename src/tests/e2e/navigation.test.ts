import { afterAll, beforeAll, describe, expect } from 'vitest';
import { getDocument, queries } from 'pptr-testing-library';
import { Browser, ElementHandle, Page } from 'puppeteer';
import puppeteer from 'puppeteer';
import { preview, PreviewServer } from 'vite';

describe('basic navigation', async () => {
  const url = 'http://localhost:4173';
  let server: PreviewServer;
  let browser: Browser;
  let page: Page;
  let document: ElementHandle<Element>;

  beforeAll(async () => {
    server = await preview({ preview: { port: 4173 } });
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    await new Promise<void>((resolve, reject) => {
      server.httpServer.close((error) => (error ? reject(error) : resolve()));
    });
  });

  beforeEach(async () => {
    await page.goto(url);
    document = await getDocument(page);
  });

  it('should have Enter App button', async () => {
    const button = await queries.getByTestId(document, 'enter-app');
    const btnText = await button.evaluate((e) => e.textContent);
    expect(btnText).toContain('Enter App');
  });

  it('should navigate to Pools and SeedLiquidity pages', async () => {
    // navigates to Pools page
    const button = await queries.getByTestId(document, 'enter-app');
    await Promise.all([page.waitForNavigation(), await button.evaluate((b: any) => b.click())]);
    expect(page.url()).toContain(`${url}/app/pools`);

    // navigates to Seed Liquidity page
    const seedLiquidityButton = await queries.getByTestId(document, 'to-seedliquidity-page');
    await Promise.all([page.waitForNavigation(), seedLiquidityButton.click()]);
    expect(page.url()).toContain(`${url}/app/seed-liquidity`);

    // navigates back to pools page
    const pools = await queries.getByTestId(document, 'to-pools-page');
    await Promise.all([page.waitForNavigation(), pools.click()]);
    expect(page.url()).toContain(`${url}/app/pools`);

    // navigates back to landing page
    const landing = await queries.getByTestId(document, 'to-landing-page');
    await Promise.all([page.waitForNavigation(), landing.click()]);
    expect(page.url()).toContain(url);
  });

  it('should have correct text for route', async () => {
    // navigates to Pools page
    const button = await queries.getByTestId(document, 'enter-app');
    await Promise.all([page.waitForNavigation(), await button.evaluate((b: any) => b.click())]);

    // expect to have Pool page text
    const dashboardTitle = await queries.getByText(document, /Total ETH locked/i);
    const dashboardText = await dashboardTitle.evaluate((e) => e.textContent);
    expect(dashboardText).toContain('Total ETH locked');

    // navigates to Seed Liquidity page
    const seedLiquidityButton = await queries.getByTestId(document, 'to-seedliquidity-page');
    await Promise.all([page.waitForNavigation(), seedLiquidityButton.click()]);

    // expect to have Seed Liquidity text
    const seedLiquidityDashboard = await queries.getByText(document, /Deposit amounts/i);
    const seedLiquidityText = await seedLiquidityDashboard.evaluate((e) => e.textContent);
    expect(seedLiquidityText).toContain('Deposit amounts');
  });
});
