const puppeteer = require('puppeteer');
const app = require('../src/app');

let server;
let browser;
let page;

beforeAll(async () => {
    server = app.listen(3000);
    browser = await puppeteer.launch({
        headless: 'new',
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage'
        ]
    });
    page = await browser.newPage();
});

afterAll(async () => {
    if (browser) {
        await browser.close();
    }
    if (server) {
        server.close();
    }
});

describe('Calculator UI', () => {
    test('adds two numbers correctly', async () => {
        await page.goto('http://localhost:3000');
        
        await page.type('#num1', '2');
        await page.type('#num2', '3');
        await page.select('#operation', 'add');
        
        await page.click('button');
        
        await page.waitForFunction(
            'document.getElementById("result").textContent.includes("5")'
        );
        
        const result = await page.$eval('#result', el => el.textContent);
        expect(result).toBe('Result: 5');
    }, 30000);
}); 