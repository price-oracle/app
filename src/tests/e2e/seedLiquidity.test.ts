import { afterAll, beforeAll, describe, expect } from 'vitest';
import { getDocument, queries } from 'pptr-testing-library';
import { Browser, ElementHandle, Page } from 'puppeteer';
import puppeteer from 'puppeteer';
import { preview, PreviewServer } from 'vite';

describe('Seed Liquidity page', async () => {
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
    await page.goto(`${url}/app/seed-liquidity`);
    document = await getDocument(page);
  });

  it('should start loading', async () => {
    const loader = await queries.findAllByTestId(document, 'loader-icon');
    expect(loader.length).toEqual(3);
  });

  it('after loading should have a Starting price input', async () => {
    const selector = '[aria-label="starting price"]';
    await page.waitForSelector(selector);
    const LockButtonText = await page.$eval(selector, (e) => e.textContent);
    expect(LockButtonText).toBeTypeOf('string');
  });
});
