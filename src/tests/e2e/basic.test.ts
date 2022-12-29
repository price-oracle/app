import { afterAll, beforeAll, describe, expect } from 'vitest';
import { getDocument, queries } from 'pptr-testing-library';
import { Browser, Page } from 'puppeteer';
import puppeteer from 'puppeteer';
import { preview, PreviewServer } from 'vite';

describe('basic e2e test', async () => {
  let server: PreviewServer;
  let browser: Browser;
  let page: Page;

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

  it('should have Enter App button', async () => {
    await page.goto('http://localhost:4173');
    const document = await getDocument(page);
    const button = await queries.getByText(document, /enter app/i);
    const btnText = await button.evaluate((e) => e.textContent);
    expect(btnText).toContain('Enter App');
  }, 60_000);
});
