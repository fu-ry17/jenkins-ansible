const puppeteer = require('puppeteer');

describe('Calculator UI Tests', () => {
    let browser;
    let page;

    beforeAll(async () => {
        browser = await puppeteer.launch();
        page = await browser.newPage();
        await page.goto('http://localhost:3000'); // Your calculator app URL
    });

    afterAll(async () => {
        await browser.close();
    });

    test('should add two numbers correctly', async () => {
        await page.type('#num1', '5');
        await page.type('#num2', '3');
        await page.click('#add-button');
        
        const result = await page.$eval('#result', el => el.textContent);
        expect(result).toBe('8');
    });
}); 