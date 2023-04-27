const { chromium } = require('playwright-chromium');
const { expect } = require('chai');

let browser, page; // Declare reusable variables

describe('E2E tests', async function () {
    this.timeout(20000);
    before(async () => { browser = await chromium.launch(); });
    after(async () => { await browser.close(); });
    beforeEach(async () => { page = await browser.newPage(); });
    afterEach(async () => { await page.close(); });

    it('works', async () => {
        await page.goto('https://sportal.bg');
       // await page.click('a >> text=БГ Футбол')
        await page.screenshot({ path: 'sportal.png' });
        expect(1).to.equal(1);
    });
});
