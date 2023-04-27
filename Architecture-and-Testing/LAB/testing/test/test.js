const {expect} = require('chai');
const{chromium} = require('playwright-chromium');
const url = 'http://127.0.0.1:5500/index.html';
describe('Custom Test', function() {
    this.timeout(5000)
    it('Try to Login', async () => {
        const browser = await chromium.launch();
        const page = await browser.newPage();
        await page.goto(url);
        await page.click('text=Login');
        await page.fill('input[name=email]', 'peter@abv.bg');
        await page.fill('input[name=password]', '123456');
        await page.getByTestId('login-btn').click();
        const content = await page.textContent('p');
        await browser.close();
        expect(content).to.be.equal('Welcome back, peter@abv.bg');
    });
});